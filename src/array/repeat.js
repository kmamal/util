const { cycle } = require('./cycle')

const repeat$$$ = (arr, n) => cycle.$$$(arr, n * arr.length)

const repeat = (arr, n) => cycle(arr, n * arr.length)

repeat.$$$ = repeat$$$

module.exports = { repeat }
