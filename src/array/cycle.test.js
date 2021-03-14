const { test } = require('@xyz/testing')
const { cycle } = require('./cycle')

test("array.cycle", (t) => {
	t.equal(cycle([], 0), [])
	t.equal(cycle([], 10), [])
	t.equal(cycle([ 1, 2, 3 ], 0), [])
	t.equal(cycle([ 1, 2, 3 ], 1), [ 1 ])
	t.equal(cycle([ 1, 2, 3 ], 2), [ 1, 2 ])
	t.equal(cycle([ 1, 2, 3 ], 3), [ 1, 2, 3 ])
	t.equal(cycle([ 1, 2, 3 ], 4), [ 1, 2, 3, 1 ])
})
