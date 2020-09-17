const { test } = require('@xyz/testing')
const { merge } = require('.')

test('array.merge', (t) => {
	t.equal(merge([], []), [])
	t.equal(merge([ 1, 2, 3 ], []), [ 1, 2, 3 ])
	t.equal(merge([], [ 1, 2, 3 ]), [ 1, 2, 3 ])
	t.equal(merge([ 1 ], [ 2 ]), [ 1, 2 ])
	t.equal(merge([ 2 ], [ 1 ]), [ 1, 2 ])
	t.equal(merge([ 1, 3, 5 ], [ 2, 4, 6 ]), [ 1, 2, 3, 4, 5, 6 ])
	t.equal(merge([ 2, 4, 6 ], [ 1, 3, 5 ]), [ 1, 2, 3, 4, 5, 6 ])
})
