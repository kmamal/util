const { __copy } = require('./copy')
const { empty$$$ } = require('./empty')
const { setOwn, getOwn } = require('./own')

const __defaults = (dst, obj, def) => {
	__copy(dst, def)
	const keys = Object.keys(obj)
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		const value = obj[key]
		if (value === undefined && Object.hasOwn(dst, key)) { continue }
		setOwn(dst, key, value)
	}
}

const defaults = (obj, def) => {
	const res = {}
	__defaults(res, obj, def)
	return res
}

const defaultsTo = (dst, obj, def) => {
	empty$$$(dst)
	__defaults(dst, obj, def)
	return dst
}

const defaults$$$ = (obj, def) => {
	const keys = Object.keys(def)
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		if (getOwn(obj, key) !== undefined) { continue }
		setOwn(obj, key, def[key])
	}
	return obj
}

defaults.to = defaultsTo
defaults.$$$ = defaults$$$

module.exports = { defaults }
