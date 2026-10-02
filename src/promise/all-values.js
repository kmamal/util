const { zip: zipObject } = require('../object/zip')
const { enumerateOwnKeys } = require('../object/own')

const allValues = async (obj) => {
	const keys = enumerateOwnKeys(obj)
	const { length } = keys
	const promises = new Array(length)
	for (let i = 0; i < length; i++) {
		promises[i] = obj[keys[i]]
	}
	const values = await Promise.all(promises)
	return zipObject(keys, values)
}

module.exports = { allValues }
