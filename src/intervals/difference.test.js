const { test } = require('@xyz/testing')
const { difference } = require('./difference')

test('intervals.difference', (t) => {
	t.equal(difference([], []), [])
	t.equal(difference([], [ [ 1, 2 ] ]), [])
	t.equal(difference([ [ 1, 2 ] ], []), [ [ 1, 2 ] ])
	t.equal(difference([ [ 1, 2 ] ], [ [ 3, 4 ] ]), [ [ 1, 2 ] ])
	t.equal(difference([ [ 1, 3 ] ], [ [ 2, 4 ] ]), [ [ 1, 2 ] ])
	t.equal(difference([ [ 2, 4 ] ], [ [ 1, 3 ] ]), [ [ 3, 4 ] ])
	t.equal(difference([ [ 1, 3 ] ], [ [ 0, 4 ] ]), [])
	t.equal(difference([ [ 1, 3 ] ], [ [ 1, 2 ], [ 2, 3 ] ]), [])
	t.equal(difference([ [ 1, 4 ] ], [ [ 1, 2 ], [ 3, 4 ] ]), [ [ 2, 3 ] ])
	t.equal(difference([ [ 1, 3 ], [ 4, 5 ], [ 6, 8 ] ], [ [ 2, 7 ] ]), [ [ 1, 2 ], [ 7, 8 ] ])
	t.equal(difference([ [ 1, 4 ] ], [ [ 2, 3 ] ]), [ [ 1, 2 ], [ 3, 4 ] ])
})