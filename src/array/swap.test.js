const { test } = require('@xyz/testing')
const { swap } = require('./swap')

test("array.swap", (t) => {
	t.equal(swap([ 1 ], 0, 0), [ 1 ])
	t.equal(swap([ 1, 2, 3 ], 0, 1), [ 2, 1, 3 ])
	t.equal(swap([ 1, 2, 3 ], 0, 2), [ 3, 2, 1 ])
})


test("array.swap.$$$", (t) => {
	t.equal(swap.$$$([ 1 ], 0, 0), [ 1 ])
	t.equal(swap.$$$([ 1, 2, 3 ], 0, 1), [ 2, 1, 3 ])
	t.equal(swap.$$$([ 1, 2, 3 ], 0, 2), [ 3, 2, 1 ])
})
