const { before } = require('./before')

const once = (fn) => before(fn, 1)

module.exports = { once }
