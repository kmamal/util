
const __mapKeys = (dst, src, fnMap) => {
	for (const key of Object.keys(src)) {
		dst[fnMap(key)] = src[key]
	}
}

const mapKeys$$$ = (obj, fnMap) => {
	const tmp = {}
	__mapKeys(tmp, obj, fnMap)
	for (const key of Object.keys(obj)) { delete obj[key] }
	Object.assign(obj, tmp)
	return obj
}

const mapKeys = (obj, fnMap) => {
	const res = {}
	__mapKeys(res, obj, fnMap)
	return res
}

mapKeys.$$$ = mapKeys$$$

module.exports = { mapKeys }
