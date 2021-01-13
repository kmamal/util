const { clamp: clampNumber } = require('../number/clamp')

const clamp = ([ start, end ], x) => clampNumber(x, start, end)

module.exports = { clamp }
