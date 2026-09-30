const { TaskQueue } = require('@kmamal/async/task-queue')
const { sleep } = require('../../promise/sleep')

const debounce = (fn, time, options = {}) => {
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

	const debounced = (...args) => {
		lastArgs = args

		if (sleeper !== null) {
			sleeper.reset(time)
			return lastPromise
		}

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

	debounced.cancel = async () => {
		generation += 1
		const currentSleeper = sleeper
		sleeper = null
		currentSleeper?.reset(0)
		await queue.empty()
	}

	debounced.flush = async () => {
		sleeper?.reset(0)
		await queue.empty()
		return lastResult
	}

	return debounced
}

module.exports = { debounce }
