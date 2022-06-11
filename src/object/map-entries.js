
const __mapEntries = (dst, src, fnMap) => {
	for (const entry of Object.entries(src)) {
		const [ key, value ] = fnMap(entry)
		dst[key] = value
	}
}

const mapEntries$$$ = (obj, fnMap) => {
	const tmp = {}
	__mapEntries(tmp, obj, fnMap)
	for (const key of Object.keys(obj)) { delete obj[key] }
	Object.assign(obj, tmp)
	return obj
}

const mapEntries = (obj, fnMap) => {
	const res = {}
	__mapEntries(res, obj, fnMap)
	return res
}

mapEntries.$$$ = mapEntries$$$

module.exports = {
	__mapEntries,
	mapEntries,
}
