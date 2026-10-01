const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __swap, swap } = require('./swap')

testVariants("array.swap", swap, (t, f) => {
	t.equal(f([ 1 ], 0, 0), [ 1 ])
	t.equal(f([ 1, 2 ], 1, 1), [ 1, 2 ])
	t.equal(f([ 1, 2, 3 ], 0, 1), [ 2, 1, 3 ])
	t.equal(f([ 1, 2, 3 ], 0, 2), [ 3, 2, 1 ])
	t.equal(f([ 1, 2, 3 ], 2, 1), [ 1, 3, 2 ])
})

test("array.__swap", (t) => {
	const arr = [ 0, 1, 2, 3, 4 ]
	__swap(arr, 1, 3)
	t.equal(arr, [ 0, 3, 2, 1, 4 ])
	__swap(arr, 3, 1)
	t.equal(arr, [ 0, 1, 2, 3, 4 ])
	__swap(arr, 2, 2)
	t.equal(arr, [ 0, 1, 2, 3, 4 ])
})
