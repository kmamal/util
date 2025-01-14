
const nonReentrant = (fn) => {
	let running = false

	return async (...args) => {
		if (running) { throw new Error('not reentrant') }
		running = true
		const result = await fn(...args)
		running = false
		return result
	}
}

module.exports = { nonReentrant }
