const { test } = require('@kmamal/testing')
const { copy } = require('./copy')

test("array.copy", (t) => {
	t.equal(copy([], []), [])
	t.equal(copy([ 1 ], [ 2 ]), [ 2 ])
	t.equal(copy([ 1 ], [ 2 ]), [ 2 ])
	t.equal(copy([ 1, 2, 3 ], [ 4, 5, 6 ]), [ 4, 5, 6 ])
})

test("array.copy.$$$", (t) => {
	t.equal(copy.$$$([], []), [])
	t.equal(copy.$$$([ 1 ], [ 2 ]), [ 2 ])
	t.equal(copy.$$$([ 1 ], [ 2 ]), [ 2 ])
	t.equal(copy.$$$([ 1, 2, 3 ], [ 4, 5, 6 ]), [ 4, 5, 6 ])
})
