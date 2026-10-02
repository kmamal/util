const { TaskQueue } = require('@kmamal/async/task-queue')
const { sleep } = require('../../promise/sleep')

const throttle = (fn, time, options = {}) => {
	const {
		leading = false,
		trailing = true,
		reentrant = false,
	} = options

	const queue = new TaskQueue()
	const tasks = new Set()
	let lastArgs
	let lastResult
	let lastPromise
	let pending = false

	let sleeper = null
	let generation = 0

	const track = (promise) => {
		promise.catch(() => {})
		tasks.add(promise)
		promise.finally(() => { tasks.delete(promise) }).catch(() => {})
		return promise
	}

	const invoke = (args) => {
		const run = async () => {
			const result = await fn(...args)
			lastResult = result
			return result
		}
		return track(reentrant ? run() : queue.run(run))
	}

	const empty = async () => {
		while (tasks.size > 0) {
			await Promise.allSettled([ ...tasks ])
		}
	}

	const startWindow = (leadingPromise) => {
		const currentGeneration = generation
		const currentSleeper = sleep(time)
		sleeper = currentSleeper

		lastPromise = track(currentSleeper.then(() => {
			if (sleeper === currentSleeper) { sleeper = null }
			if (currentGeneration !== generation) { return lastResult }
			if (!trailing || !pending) { return leadingPromise ?? lastResult }
			pending = false
			const trailingPromise = invoke(lastArgs)
			if (leading) { startWindow(trailingPromise) }
			return trailingPromise
		}))
	}

	const throttled = (...args) => {
		lastArgs = args

		if (sleeper !== null) {
			pending = true
			return lastPromise
		}

		pending = !leading
		const leadingPromise = leading ? invoke(args) : null
		startWindow(leadingPromise)
		return leadingPromise ?? lastPromise
	}

	throttled.cancel = async () => {
		generation += 1
		pending = false
		const currentSleeper = sleeper
		sleeper = null
		currentSleeper?.reset(0)
		await empty()
	}

	throttled.flush = async () => {
		for (;;) {
			const currentSleeper = sleeper
			if (currentSleeper === null) { break }
			currentSleeper.reset(0)
			await currentSleeper
		}
		await empty()
		return lastResult
	}

	return throttled
}

module.exports = { throttle }
