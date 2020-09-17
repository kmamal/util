const { test } = require('@xyz/testing')
const { nAry } = require('.')

test('function.arity', (t) => {
	t.expect(5)
	const arr = [ 1, 2, 3, 4, 5 ]
	nAry((...args) => t.equal(args, []), 0)(...arr)
	nAry((...args) => t.equal(args, [ 1 ]), 1)(...arr)
	nAry((...args) => t.equal(args, [ 1, 2 ]), 2)(...arr)
	nAry((...args) => t.equal(args, [ 1, 2, 3 ]), 3)(...arr)
	nAry((...args) => t.equal(args, [ 1, 2, 3, 4 ]), 4)(...arr)
})
