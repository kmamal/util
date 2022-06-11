
const __map = (dst, src, fnMap) => {
	for (const entry of Object.entries(src)) {
		const [ key, value ] = fnMap(entry)
		dst[key] = value
	}
}

const map$$$ = (obj, fnMap) => {
	const tmp = {}
	__map(tmp, obj, fnMap)
	for (const key of Object.keys(obj)) { delete obj[key] }
	Object.assign(obj, tmp)
	return obj
}

const map = (obj, fnMap) => {
	const res = {}
	__map(res, obj, fnMap)
	return res
}

map.$$$ = map$$$

module.exports = { map }
