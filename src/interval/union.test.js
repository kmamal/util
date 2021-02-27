const { test } = require('@xyz/testing')
const { union } = require('./union')

test("intervals.union", (t) => {
	t.equal(union([ 1, 2 ], [ 1, 2 ]), [ 1, 2 ])
	t.equal(union([ 1, 2 ], [ 2, 3 ]), [ 1, 3 ])
	t.equal(union([ 2, 3 ], [ 1, 2 ]), [ 1, 3 ])
	t.equal(union([ 1, 4 ], [ 2, 3 ]), [ 1, 4 ])
	t.equal(union([ 2, 3 ], [ 1, 4 ]), [ 1, 4 ])

	t.equal(union([ 1, 2 ], [ 3, 4 ]), null)
})
