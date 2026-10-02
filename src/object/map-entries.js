const { empty$$$ } = require('./empty')
const { setOwn, enumerateOwnKeys } = require('./own')

const __mapEntries = (dst, src, fnMap) => {
	const keys = enumerateOwnKeys(src)
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		const mapped = fnMap([ key, src[key] ])
		setOwn(dst, mapped[0], mapped[1])
	}
}


const mapEntries = (obj, fnMap) => {
	const res = {}
	__mapEntries(res, obj, fnMap)
	return res
}

const mapEntriesTo = (dst, obj, fnMap) => {
	empty$$$(dst)
	__mapEntries(dst, obj, fnMap)
	return dst
}

const mapEntries$$$ = (_obj, fnMap) => {
	const res = _obj
	const obj = { ..._obj }
	empty$$$(res)
	__mapEntries(res, obj, fnMap)
	return res
}

mapEntries.to = mapEntriesTo
mapEntries.$$$ = mapEntries$$$


module.exports = {
	__mapEntries,
	mapEntries,
}
