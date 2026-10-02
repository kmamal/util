const { empty$$$ } = require('./empty')
const { setOwn, enumerateOwnKeys } = require('./own')

const __copy = (dst, src) => {
	const keys = enumerateOwnKeys(src)
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		setOwn(dst, key, src[key])
	}
}

const copyTo = (dst, src) => {
	empty$$$(dst)
	__copy(dst, src)
	return dst
}

module.exports = {
	__copy,
	copyTo,
}
