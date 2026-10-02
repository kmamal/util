const { copyTo } = require('./copy')
const { cloneWith } = require('./clone')
const { setOwn, getOwn, enumerateOwnKeys } = require('./own')

const _isObject = (x) => {
	if (x === null || typeof x !== 'object') { return false }
	const proto = Object.getPrototypeOf(x)
	return proto === Object.prototype || proto === null
}

const _keepFunctions = (x) => typeof x === 'function' ? x : undefined

const _cloneValue = (x) => cloneWith(x, _keepFunctions)

const __merge = (dst, a, b) => {
	const keys = enumerateOwnKeys(b)
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		const bValue = b[key]
		if (!_isObject(bValue)) {
			setOwn(dst, key, _cloneValue(bValue))
			continue
		}
		const aValue = getOwn(a, key)
		let dstValue = getOwn(dst, key)
		if (!_isObject(aValue) || !_isObject(dstValue)) {
			dstValue = {}
			setOwn(dst, key, dstValue)
			__merge(dstValue, dstValue, bValue)
			continue
		}
		__merge(dstValue, aValue, bValue)
	}
}


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
