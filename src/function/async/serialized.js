
const serialized = (fn) => {
	let promise = Promise.resolve()

	return async (...args) => {
		const result = promise.then(() => fn(...args))
		promise = result.catch(() => {})
		return await result
	}
}

module.exports = { serialized }
