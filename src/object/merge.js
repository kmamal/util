const { copyTo } = require('./copy')
const { cloneWith } = require('./clone')
const { setOwn, getOwn, enumerateOwnKeys } = require('./own')

const _isObject = (x) => {
	if (x === null || typeof x !== 'object' || Array.isArray(x)) { return false }
	const proto = Object.getPrototypeOf(x)
	return proto === Object.prototype || proto === null
}

const _keepFunctions = (x) => typeof x === 'function' ? x : undefined

const _cloneValue = (x) => cloneWith(x, _keepFunctions)

const _merge = (dst, a, b, cache) => {
	let byA = cache.get(b)
	if (byA === undefined) {
		byA = new Map()
		cache.set(b, byA)
	}
	byA.set(a, dst)

	const keys = enumerateOwnKeys(b)
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		const bValue = b[key]
		if (!_isObject(bValue)) {
			setOwn(dst, key, _cloneValue(bValue))
			continue
		}
		const aValue = a === null ? undefined : getOwn(a, key)
		const dstValue = getOwn(dst, key)
		const aContext = _isObject(aValue) && _isObject(dstValue) ? aValue : null

		const merged = cache.get(bValue)?.get(aContext)
		if (merged !== undefined) {
			setOwn(dst, key, merged)
			continue
		}

		if (aContext === null) {
			const fresh = {}
			setOwn(dst, key, fresh)
			_merge(fresh, null, bValue, cache)
			continue
		}
		_merge(dstValue, aValue, bValue, cache)
	}
}

const __merge = (dst, a, b) => _merge(dst, a, b, new Map())


const merge = (a, b) => {
	const res = _cloneValue(a)
	__merge(res, a, b)
	return res
}

const mergeTo = (dst, a, b) => {
	copyTo(dst, _cloneValue(a))
	__merge(dst, a, b)
	return dst
}

const merge$$$ = (a, b) => {
	__merge(a, a, b)
	return a
}

merge.to = mergeTo
merge.$$$ = merge$$$


module.exports = {
	__merge,
	merge,
}
