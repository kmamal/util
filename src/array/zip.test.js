const { test } = require('@xyz/testing')
const { zip, zipWith } = require('./zip')
const { sum } = require('./sum')

test("array.zip", (t) => {
	t.equal(zip([]), [])
	t.equal(zip([ [] ]), [])
	t.equal(zip([ [], [], [] ]), [])
	t.equal(zip([ [ 1, 2, 3 ] ]), [ [ 1 ], [ 2 ], [ 3 ] ])
	t.equal(zip([ [ 1 ], [ 2 ], [ 3 ] ]), [ [ 1, 2, 3 ] ])
	t.equal(zip([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]), [ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ])
	t.equal(zip([ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ]), [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ])
})

test("array.zipWith", (t) => {
	t.equal(zipWith([], sum), [])
	t.equal(zipWith([ [] ], sum), [])
	t.equal(zipWith([ [], [], [] ], sum), [])
	t.equal(zipWith([ [ 1, 2, 3 ] ], sum), [ 1, 2, 3 ])
	t.equal(zipWith([ [ 1 ], [ 2 ], [ 3 ] ], sum), [ 6 ])
	t.equal(zipWith([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ], sum), [ 12, 15, 18 ])
	t.equal(zipWith([ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ], sum), [ 6, 15, 24 ])
})
