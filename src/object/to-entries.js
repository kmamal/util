const { enumerateOwnKeys } = require('./own')

const toEntries = (obj) => {
	const res = enumerateOwnKeys(obj)
	for (let i = 0; i < res.length; i++) {
		const key = res[i]
		res[i] = [ key, obj[key] ]
	}
	return res
}

const toEntriesTo = (dst, obj) => {
	const keys = enumerateOwnKeys(obj)
	const { length } = keys
	dst.length = length
	for (let i = 0; i < length; i++) {
		const key = keys[i]
		dst[i] = [ key, obj[key] ]
	}
	return dst
}

toEntries.to = toEntriesTo

module.exports = { toEntries }
