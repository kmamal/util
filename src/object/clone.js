const { setOwn } = require('./own')

const _clone = (x, cache) => {
	if (typeof x === 'function') { throw new Error("can't clone functions") }

	if (x === null || typeof x !== 'object') { return x }

	if (cache.has(x)) { return cache.get(x) }

	if (Array.isArray(x)) {
		const { length } = x
		const res = new Array(length)
		cache.set(x, res)
		for (let i = 0; i < length; i++) {
			res[i] = _clone(x[i], cache)
		}
		return res
	}

	if (x instanceof Map) {
		const res = new Map()
		cache.set(x, res)
		for (const entry of x.entries()) {
			res.set(_clone(entry[0], cache), _clone(entry[1], cache))
		}
		return res
	}

	if (x instanceof Set) {
		const res = new Set()
		cache.set(x, res)
		for (const value of x.values()) {
			res.add(_clone(value, cache))
		}
		return res
	}

	if (x instanceof Date) {
		const res = new Date(x.getTime())
		cache.set(x, res)
		return res
	}

	if (x instanceof RegExp) {
		const res = new RegExp(x.source, x.flags)
		res.lastIndex = x.lastIndex
		cache.set(x, res)
		return res
	}

	if (x instanceof DataView) {
		const res = new DataView(x.buffer.slice(x.byteOffset, x.byteOffset + x.byteLength))
		cache.set(x, res)
		return res
	}

	if (ArrayBuffer.isView(x)) {
		const res = x.slice()
		cache.set(x, res)
		return res
	}

	const res = Object.create(Object.getPrototypeOf(x))
	cache.set(x, res)
	const keys = Object.keys(x)
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		setOwn(res, key, _clone(x[key], cache))
	}
	return res
}

const clone = (x) => _clone(x, new Map())

module.exports = { clone }
