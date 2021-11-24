
const __mapValues = (dst, src, fnMap) => {
	for (const key of Object.keys(src)) {
		dst[key] = fnMap(src[key])
	}
}

const mapValues$$$ = (obj, fnMap) => {
	__mapValues(obj, obj, fnMap)
	return obj
}

const mapValues = (obj, fnMap) => {
	const res = {}
	__mapValues(res, obj, fnMap)
	return res
}

mapValues.$$$ = mapValues$$$

module.exports = { mapValues }
