const { nextToward } = require('../ieee-float/double')

const from = (start, end, open_start, open_end) => [
	open_start ? nextToward(start, Infinity) : start,
	open_end ? nextToward(end, -Infinity) : end,
]

module.exports = { from }
