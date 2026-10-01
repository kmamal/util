const { TaskQueue } = require('@kmamal/async/task-queue')
const { sleep } = require('../../promise/sleep')

const debounce = (fn, time, options = {}) => {
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

	const debounced = (...args) => {
		lastArgs = args

		if (sleeper !== null) {
			sleeper.reset(time)
			pending = true
			return lastPromise
		}

		const currentGeneration = generation
		const currentSleeper = sleep(time)
		sleeper = currentSleeper
		pending = !leading

		const leadingPromise = leading ? invoke(args) : null

		lastPromise = track(currentSleeper.then(() => {
			if (sleeper === currentSleeper) { sleeper = null }
			if (currentGeneration !== generation) { return lastResult }
			if (!trailing || !pending) { return leadingPromise ?? lastResult }
			pending = false
			return invoke(lastArgs)
		}))

		return leadingPromise ?? lastPromise
	}

	debounced.cancel = async () => {
		generation += 1
		pending = false
		const currentSleeper = sleeper
		sleeper = null
		currentSleeper?.reset(0)
		await empty()
	}

	debounced.flush = async () => {
		sleeper?.reset(0)
		await empty()
		return lastResult
	}

	return debounced
}

module.exports = { debounce }
