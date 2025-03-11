
const nonReentrant = (fn, shouldThrow = false) => {
	let running = false

	return async (...args) => {
		if (running) {
			const error = new Error('not reentrant')
			if (shouldThrow) { throw error }
			return error
		}
		running = true
		const result = await fn(...args)
		running = false
		return result
	}
}

module.exports = { nonReentrant }
