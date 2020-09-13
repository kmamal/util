const { overlap } = require('./overlap')

const intersection = (a, b) => {
	if (!overlap(a, b)) { return null }

	const [ a_start, a_end ] = a
	const [ b_start, b_end ] = b
	const start = Math.max(a_start, b_start)
	const end = Math.min(a_end, b_end)
	return [ start, end ]
}

module.exports = { intersection }
