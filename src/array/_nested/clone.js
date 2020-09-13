const { clone: clone1d } = require('../clone')

const clone = (a) => Array.from(a, clone1d)

module.exports = { clone }
