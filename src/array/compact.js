const { filter } = require('./filter')

const compact$$$ = (arr) => filter.$$$(arr, Boolean)

const compact = (arr) => filter(arr, Boolean)

compact.$$$ = compact$$$

module.exports = { compact }
