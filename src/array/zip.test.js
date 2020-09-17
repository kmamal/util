const { test } = require('@xyz/testing')
const { zip } = require('.')

test('array.zip', (t) => {
	t.equal(zip([]), [])
	t.equal(zip([ [] ]), [])
	t.equal(zip([ [], [], [] ]), [])
	t.equal(zip([ [ 1, 2, 3 ] ]), [ [ 1 ], [ 2 ], [ 3 ] ])
	t.equal(zip([ [ 1 ], [ 2 ], [ 3 ] ]), [ [ 1, 2, 3 ] ])
	t.equal(zip([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]), [ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ])
	t.equal(zip([ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ]), [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ])
})
