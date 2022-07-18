
const extend$$$ = Object.assign

const extend = (...srcs) => Object.assign({}, ...srcs)

extend.$$$ = extend$$$

module.exports = { extend }
