const { test } = require('@kmamal/testing')
const { flat } = require('./flat')

test("array.flat", (t) => {
	t.equal(flat([]), [])
	t.equal(flat([ [] ]), [])
	t.equal(flat([ [], [], [] ]), [])
	t.equal(flat([ [ 1, 2, 3 ] ]), [ 1, 2, 3 ])
	t.equal(flat([ [ 1 ], [ 2 ], [ 3 ] ]), [ 1, 2, 3 ])
	t.equal(flat([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
	t.equal(flat([ [ [ 1 ], 2, [ 3 ] ], [ 4, [ 5, 6 ] ], [ [ 7, 8 ], 9 ] ]), [ [ 1 ], 2, [ 3 ], 4, [ 5, 6 ], [ 7, 8 ], 9 ])
	t.equal(flat([ 1, 2, [ 3, 4, [ 5, 6 ] ] ]), [ 1, 2, 3, 4, [ 5, 6 ] ])
	t.equal(flat([ 1, 2, [ 3, 4, [ 5, 6, [ 7, 8, [ 9 ] ] ] ] ], Infinity), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
})
