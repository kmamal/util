const { overlap } = require('./overlap')

const union = (a, b) => {
	if (!overlap(a, b)) { return null }

	const [ a_start, a_end ] = a
	const [ b_start, b_end ] = b
	const start = Math.min(a_start, b_start)
	const end = Math.max(a_end, b_end)
	return [ start, end ]
}

module.exports = { union }
