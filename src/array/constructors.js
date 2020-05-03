
const fromFactory = (n, factory) => Array.from({ length: n }, (_, i) => factory(i))

module.exports = { fromFactory }
