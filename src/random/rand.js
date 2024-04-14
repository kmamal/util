const { uniform } = require('./uniform')

const rand = (n, options) => {
	const getRandom = options?.random ?? uniform
	return Math.floor(getRandom() * n)
}

module.exports = { rand }
