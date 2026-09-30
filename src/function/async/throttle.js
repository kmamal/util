const { TaskQueue } = require('@kmamal/async/task-queue')
const { sleep } = require('../../promise/sleep')

const throttle = (fn, time, options = {}) => {
	const {
		leading = false,
		trailing = true,
		reentrant = false,
	} = options

	const queue = new TaskQueue()
	let lastArgs
	let lastResult
	let lastPromise

	let sleeper = null
	let generation = 0

	const invoke = async () => {
		lastResult = await fn(...lastArgs)
		if (!reentrant) { await lastResult }
	}

	const throttled = (...args) => {
		lastArgs = args

		if (sleeper !== null) { return lastPromise }

		const currentGeneration = generation
		const currentSleeper = sleep(time)
		sleeper = currentSleeper

		if (leading) { queue.run(invoke) }

		let promise = currentSleeper.then(() => {
			if (sleeper === currentSleeper) { sleeper = null }
		})

		if (trailing) {
			const slept = promise
			promise = queue.run(async () => {
				await slept
				if (currentGeneration !== generation) { return }
				await invoke()
			})
		}

		lastPromise = promise.then(() => lastResult)
		return lastPromise
	}

	throttled.cancel = async () => {
		generation += 1
		const currentSleeper = sleeper
		sleeper = null
		currentSleeper?.reset(0)
		await queue.empty()
	}

	throttled.flush = async () => {
		sleeper?.reset(0)
		await queue.empty()
		return lastResult
	}

	return throttled
}

module.exports = { throttle }
