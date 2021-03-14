const { test } = require('@xyz/testing')
const { combine } = require('./combine')
const { add } = require('../operators')

test("array.combine", (t) => {
	t.equal(combine([], 0, add, [], 0, 0), [])
	t.equal(combine([ 1 ], 0, add, [ 1 ], 0, 1), [ 2 ])
	t.equal(combine([ 1, 2, 3 ], 0, add, [ 1, 2, 3 ], 0, 1), [ 2, 2, 3 ])
	t.equal(combine([ 1, 2, 3 ], 0, add, [ 1, 2, 3 ], 0, 3), [ 2, 4, 6 ])
})

test("array.combine.$$$", (t) => {
	t.equal(combine.$$$([], 0, add, [], 0, 0), [])
	t.equal(combine.$$$([ 1 ], 0, add, [ 1 ], 0, 1), [ 2 ])
	t.equal(combine.$$$([ 1, 2, 3 ], 0, add, [ 1, 2, 3 ], 0, 1), [ 2, 2, 3 ])
	t.equal(combine.$$$([ 1, 2, 3 ], 0, add, [ 1, 2, 3 ], 0, 3), [ 2, 4, 6 ])
})
