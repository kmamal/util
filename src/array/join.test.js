const { test } = require('@kmamal/testing')
const { join } = require('./join')

test("array.join", (t) => {
	t.equal(join([], [ 0 ]), [])
	t.equal(join([ 1 ], [ 0 ]), [ 1 ])
	t.equal(join([ 1, 2, 3 ], [ 0 ]), [ 1, 0, 2, 0, 3 ])
	t.equal(join([ 1, 2, 3 ], [ 8, 9 ]), [ 1, 8, 9, 2, 8, 9, 3 ])
})
