const { test } = require('@xyz/testing')
const { chunk } = require('./chunk')

test("array.chunk", (t) => {
	t.equal(chunk([], 1), [])
	t.equal(chunk([ 1 ], 1), [ [ 1 ] ])
	t.equal(chunk([ 1, 2, 3 ], 1), [ [ 1 ], [ 2 ], [ 3 ] ])
	t.equal(chunk([ 1, 2, 3 ], 2), [ [ 1, 2 ], [ 3 ] ])
	t.equal(chunk([ 1, 2, 3 ], 3), [ [ 1, 2, 3 ] ])
	t.equal(chunk([ 1, 2, 3 ], 4), [ [ 1, 2, 3 ] ])
	t.equal(chunk([ 1, 2, 3, 4, 5 ], 2), [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ])
})

test("array.chunk.$$$", (t) => {
	t.equal(chunk.$$$([], 1), [])
	t.equal(chunk.$$$([ 1 ], 1), [ [ 1 ] ])
	t.equal(chunk.$$$([ 1, 2, 3 ], 1), [ [ 1 ], [ 2 ], [ 3 ] ])
	t.equal(chunk.$$$([ 1, 2, 3 ], 2), [ [ 1, 2 ], [ 3 ] ])
	t.equal(chunk.$$$([ 1, 2, 3 ], 3), [ [ 1, 2, 3 ] ])
	t.equal(chunk.$$$([ 1, 2, 3 ], 4), [ [ 1, 2, 3 ] ])
	t.equal(chunk.$$$([ 1, 2, 3, 4, 5 ], 2), [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ])
})
