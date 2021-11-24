const { keys } = require('./keys')
const { clone } = require('./clone')

const _isObject = (x) => true
	&& typeof x === 'object'
	&& !Array.isArray(x)

const __merge = (dst, src) => {
	for (const key of keys(src)) {
		const srcValue = src[key]
		if (!_isObject(srcValue)) {
			dst[key] = srcValue
			continue
		}
		const dstValue = dst[key]
		if (!_isObject(dstValue)) {
			dst[key] = srcValue
			continue
		}
		__merge(dstValue, srcValue)
	}
}

const merge$$$ = (a, b) => {
	__merge(a, b)
	return a
}

const merge = (a, b) => {
	const res = clone(a)
	__merge(res, b)
	return res
}

merge.$$$ = merge$$$

module.exports = {
	__merge,
	merge,
}
