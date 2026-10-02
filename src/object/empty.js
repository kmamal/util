
const { enumerateOwnKeys } = require('./own')

const empty$$$ = (obj) => {
	const keys = enumerateOwnKeys(obj)
	for (let i = 0; i < keys.length; i++) {
		delete obj[keys[i]]
	}
	return obj
}

module.exports = { empty$$$ }
