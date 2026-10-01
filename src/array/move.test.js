const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __move, move } = require('./move')

testVariants("array.move", move, (t, f) => {
	t.equal(f([ 1 ], 0, 0), [ 1 ])
	t.equal(f([ 1, 2 ], 0, 0), [ 1, 2 ])
	t.equal(f([ 1, 2 ], 0, 1), [ 2, 1 ])
	t.equal(f([ 1, 2, 3 ], 0, 1), [ 2, 1, 3 ])
	t.equal(f([ 1, 2, 3 ], 0, 2), [ 2, 3, 1 ])
	t.equal(f([ 1, 2, 3 ], 2, 0), [ 3, 1, 2 ])
})

test("array.__move", (t) => {
	const call = (from, to) => {
		const arr = [ 0, 1, 2, 3, 4, 5 ]
		__move(arr, from, to)
		return arr
	}

	t.equal(call(1, 4), [ 0, 2, 3, 4, 1, 5 ])
	t.equal(call(4, 1), [ 0, 4, 1, 2, 3, 5 ])
	t.equal(call(2, 3), [ 0, 1, 3, 2, 4, 5 ])
	t.equal(call(3, 2), [ 0, 1, 3, 2, 4, 5 ])
	t.equal(call(2, 2), [ 0, 1, 2, 3, 4, 5 ])
	t.equal(call(0, 5), [ 1, 2, 3, 4, 5, 0 ])
	t.equal(call(5, 0), [ 5, 0, 1, 2, 3, 4 ])
})
