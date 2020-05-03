const { identity } = require('./identity')

const _newMap = () => new Map()

const memoize = (fn, options) => {
	const resolver = (options && options.resolver) || identity
	const constructor = (options && options.constructor) || _newMap

	const cache = constructor ? constructor() : new Map()

	const memoized = (...args) => {
		const key = resolver(...args)
		if (cache.has(key)) {
			return cache.get(key)
		}

		const result = fn(...args)

		cache.set(key, result)
		return result
	}

	memoized.cache = cache

	return memoized
}

module.exports = { memoize }
