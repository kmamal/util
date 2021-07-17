const { eq } = require('../operators/comparison/eq')

const matchesWith = (obj, pattern, fnEqProp) => {
	for (const [ key, value ] of Object.entries(pattern)) {
		if (!fnEqProp(obj[key], value, key)) { return false }
	}
	return true
}

const matches = (obj, pattern) => matchesWith(obj, pattern, eq)

module.exports = {
	matchesWith,
	matches,
}
