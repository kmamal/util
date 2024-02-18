const { test } = require('@kmamal/testing')
const { nullary } = require('./nullary')
const { unary } = require('./unary')
const { binary } = require('./binary')
const { ternary } = require('./ternary')

test("function.arity", (t) => {
	const arr = [ 1, 2, 3, 4, 5 ]
	nullary((...args) => t.equal(args, []), 0)(...arr)
	unary((...args) => t.equal(args, [ 1 ]), 1)(...arr)
	binary((...args) => t.equal(args, [ 1, 2 ]), 2)(...arr)
	ternary((...args) => t.equal(args, [ 1, 2, 3 ]), 3)(...arr)
})
