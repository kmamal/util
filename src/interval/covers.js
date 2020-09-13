
const covers = ([ a_start, a_end ], [ b_start, b_end ]) => a_start <= b_start && b_end <= a_end

module.exports = { covers }
