const { test } = require('@kmamal/testing')
const { combine } = require('./combine')
const { add } = require('../operators')

test("array.combine", (t) => {
	t.equal(combine([], [], add), [])
	t.equal(combine([ 1 ], [ 1 ], add), [ 2 ])
	t.equal(combine([ 1, 2, 3 ], [ 1, 2, 3 ], add), [ 2, 4, 6 ])
})

test("array.combine.$$$", (t) => {
	t.equal(combine.$$$([], [], add), [])
	t.equal(combine.$$$([ 1 ], [ 1 ], add), [ 2 ])
	t.equal(combine.$$$([ 1, 2, 3 ], [ 1, 2, 3 ], add), [ 2, 4, 6 ])
})
