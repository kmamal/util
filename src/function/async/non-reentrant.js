
const kNonReentrant = Symbol("non-reentrant")

const nonReentrant = (fn, shouldThrow = false) => {
	let running = false

	return async (...args) => {
		if (running) {
			if (shouldThrow) { throw new Error('not reentrant') }
			return kNonReentrant
		}
		running = true
		try { return await fn(...args) }
		finally { running = false }
	}
}

module.exports = {
	SYM: { kNonReentrant },
	nonReentrant,
}
