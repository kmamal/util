const { test } = require('@kmamal/testing')
const { move } = require('./move')

test("array.move", (t) => {
	t.equal(move([ 1 ], 0, 0), [ 1 ])
	t.equal(move([ 1, 2, 3 ], 0, 1), [ 2, 1, 3 ])
	t.equal(move([ 1, 2, 3 ], 0, 2), [ 2, 3, 1 ])
	t.equal(move([ 1, 2, 3 ], 2, 0), [ 3, 1, 2 ])
})


test("array.move.$$$", (t) => {
	t.equal(move.$$$([ 1 ], 0, 0), [ 1 ])
	t.equal(move.$$$([ 1, 2, 3 ], 0, 1), [ 2, 1, 3 ])
	t.equal(move.$$$([ 1, 2, 3 ], 0, 2), [ 2, 3, 1 ])
	t.equal(move.$$$([ 1, 2, 3 ], 2, 0), [ 3, 1, 2 ])
})
