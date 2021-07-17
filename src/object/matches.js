
const matchesWith = (obj, pattern, fnPropEq) => {
	for (const [ key, value ] of Object.entries(pattern)) {
		if (!fnPropEq(key, obj[key], value)) { return false }
	}
	return true
}

const _propEq = (key, a, b) => a === b

const matches = (obj, pattern) => matchesWith(obj, pattern, _propEq)

module.exports = {
	matchesWith,
	matches,
}
