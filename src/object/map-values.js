
const __mapValues = (dst, src, fn_map) => {
	for (const key of Object.keys(src)) {
		dst[key] = fn_map(src[key])
	}
}

const mapValues$$$ = (obj, fn_map) => {
	__mapValues(obj, obj, fn_map)
	return obj
}

const mapValues = (obj, fn_map) => {
	const res = {}
	__mapValues(res, obj, fn_map)
	return res
}

mapValues.$$$ = mapValues$$$

module.exports = { mapValues }
