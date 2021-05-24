const { test } = require('@kmamal/testing')
const { fill } = require('./fill')

test("array.fill", (t) => {
	t.equal(fill([], 0), [])
	t.equal(fill([], 0, 1, 3), [])
	t.equal(fill([ 1 ], 0), [ 0 ])
	t.equal(fill([ 1 ], 0, 0, 1), [ 0 ])
	t.equal(fill([ 1 ], 0, 0, 0), [ 1 ])
	t.equal(fill([ 1, 2, 3 ], 0), [ 0, 0, 0 ])
	t.equal(fill([ 1, 2, 3 ], 0, 1, 2), [ 1, 0, 3 ])
	t.equal(fill([ 1, 2, 3 ], 0, 0, 3), [ 0, 0, 0 ])
})

test("array.fill.$$$", (t) => {
	t.equal(fill.$$$([], 0), [])
	t.equal(fill.$$$([], 0, 1, 3), [])
	t.equal(fill.$$$([ 1 ], 0), [ 0 ])
	t.equal(fill.$$$([ 1 ], 0, 0, 1), [ 0 ])
	t.equal(fill.$$$([ 1 ], 0, 0, 0), [ 1 ])
	t.equal(fill.$$$([ 1, 2, 3 ], 0), [ 0, 0, 0 ])
	t.equal(fill.$$$([ 1, 2, 3 ], 0, 1, 2), [ 1, 0, 3 ])
	t.equal(fill.$$$([ 1, 2, 3 ], 0, 0, 3), [ 0, 0, 0 ])
})
