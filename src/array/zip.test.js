const { testVariants } = require('../testing/test-variants')
const { zip, zipWith } = require('./zip')
const { sum } = require('./sum')

testVariants("array.zip", zip, (t, f) => {
	t.equal(f([]), [])
	t.equal(f([ [] ]), [])
	t.equal(f([ [], [], [] ]), [])
	t.equal(f([ [ 1, 2, 3 ] ]), [ [ 1 ], [ 2 ], [ 3 ] ])
	t.equal(f([ [ 1 ], [ 2 ], [ 3 ] ]), [ [ 1, 2, 3 ] ])
	t.equal(f([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]), [ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ])
	t.equal(f([ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ]), [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ])
})

testVariants("array.zipWith", zipWith, (t, f) => {
	t.equal(f([], sum), [])
	t.equal(f([ [] ], sum), [])
	t.equal(f([ [], [], [] ], sum), [])
	t.equal(f([ [ 1, 2, 3 ] ], sum), [ 1, 2, 3 ])
	t.equal(f([ [ 1 ], [ 2 ], [ 3 ] ], sum), [ 6 ])
	t.equal(f([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ], sum), [ 12, 15, 18 ])
	t.equal(f([ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ], sum), [ 6, 15, 24 ])
})
