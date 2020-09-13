const { concat } = require('../iterable/concat')

const union = (a, b) => new Set(concat([ a, b ]))

module.exports = { union }
