
const overlap = ([ a_start, a_end ], [ b_start, b_end ]) => false
	|| (a_start < b_end && b_start <= a_end)
	|| (b_start < a_end && a_start <= b_end)

module.exports = { overlap }
