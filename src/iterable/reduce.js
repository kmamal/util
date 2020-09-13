const { scan } = require('./scan')
const { last } = require('./last')

const reduce = (iterable, fn, init) => last(scan(iterable, fn, init))

module.exports = { reduce }
