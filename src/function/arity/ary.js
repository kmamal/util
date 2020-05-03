const { nullary } = require('./nullary')
const { unary } = require('./unary')
const { binary } = require('./binary')
const { ternary } = require('./ternary')
const { nAry } = require('./n-ary')

const ary = (n) => {
	switch (n) {
		case 0: return nullary
		case 1: return unary
		case 2: return binary
		case 3: return ternary
		default: return nAry(n)
	}
}

module.exports = { ary }
