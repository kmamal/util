const { covers } = require('./covers')
const { nextToward } = require('../ieee-float')

const difference = (a, b) => {
	const [ a_start, a_end ] = a
	const [ b_start, b_end ] = b

	if (covers(b, a) || (a_start < b_start && b_end < a_end)) { return null }

	return a_start < b_start
		? [ a_start, Math.min(nextToward(b_start, -Infinity), a_end) ]
		: [ Math.max(nextToward(b_end, Infinity), a_start), a_end ]
}

module.exports = { difference }
