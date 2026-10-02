const { empty$$$ } = require('./empty')
const { setOwn, enumerateOwnKeys } = require('./own')

const _keySet = (keys) => {
	const set = Object.create(null)
	for (let i = 0; i < keys.length; i++) {
		set[keys[i]] = true
	}
	return set
}

const __pick = (dst, src, keys) => {
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		if (!Object.hasOwn(src, key)) { continue }
		setOwn(dst, key, src[key])
	}
}

const __omit = (dst, src, keys) => {
	const omitted = _keySet(keys)
	const srcKeys = enumerateOwnKeys(src)
	for (let i = 0; i < srcKeys.length; i++) {
		const key = srcKeys[i]
		if (key in omitted) { continue }
		setOwn(dst, key, src[key])
	}
}


const pick = (obj, keys) => {
	const res = {}
	__pick(res, obj, keys)
	return res
}

const pickTo = (dst, obj, keys) => {
	empty$$$(dst)
	__pick(dst, obj, keys)
	return dst
}

const pick$$$ = (obj, keys) => {
	const picked = _keySet(keys)
	const objKeys = enumerateOwnKeys(obj)
	for (let i = 0; i < objKeys.length; i++) {
		const key = objKeys[i]
		if (key in picked) { continue }
		delete obj[key]
	}
	return obj
}

pick.to = pickTo
pick.$$$ = pick$$$


const omit = (obj, keys) => {
	const res = {}
	__omit(res, obj, keys)
	return res
}

const omitTo = (dst, obj, keys) => {
	empty$$$(dst)
	__omit(dst, obj, keys)
	return dst
}

const omit$$$ = (obj, keys) => {
	for (let i = 0; i < keys.length; i++) {
		delete obj[keys[i]]
	}
	return obj
}

omit.to = omitTo
omit.$$$ = omit$$$


module.exports = {
	__pick,
	__omit,
	pick,
	omit,
}
