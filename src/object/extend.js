
const extend$$$ = (dst, ...srcs) => Object.assign(dst, ...srcs)

const extend = (...srcs) => Object.assign({}, ...srcs)

extend.$$$ = extend$$$

module.exports = { extend }
