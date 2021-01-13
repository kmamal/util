
const clamp = ([ start, end ], x) => x < start ? start : x > end ? end : x

module.exports = { clamp }
