
const makeSyncMiddleware = (handlers) => (...args) => {
	let result

	let handled
	const next = () => { handled = false }

	for (const func of handlers) {
		handled = true
		result = func(next, ...args)
		if (handled) { break }
	}

	return handled ? result : undefined
}

const makeAsyncMiddleware = (handlers) => async (...args) => {
	let result

	let handled
	const next = () => { handled = false }

	for (const func of handlers) {
		handled = true
		result = await func(next, ...args)
		if (handled) { break }
	}

	return handled ? result : undefined
}

const middleware = (handlers, options) => options?.sync
	? makeSyncMiddleware(handlers)
	: makeAsyncMiddleware(handlers)

module.exports = { middleware }
