const { test } = require('@xyz/testing')
const { rotate } = require('.')

test('array.rotate', (t) => {
	t.equal(rotate([], -2), [])
	t.equal(rotate([], 0), [])
	t.equal(rotate([], 2), [])
	t.equal(rotate([ 1 ], -2), [ 1 ])
	t.equal(rotate([ 1 ], 0), [ 1 ])
	t.equal(rotate([ 1 ], 2), [ 1 ])
	t.equal(rotate([ 1, 2 ], -2), [ 1, 2 ])
	t.equal(rotate([ 1, 2 ], 0), [ 1, 2 ])
	t.equal(rotate([ 1, 2 ], 2), [ 1, 2 ])
	t.equal(rotate([ 1, 2, 3 ], -2), [ 3, 1, 2 ])
	t.equal(rotate([ 1, 2, 3 ], 0), [ 1, 2, 3 ])
	t.equal(rotate([ 1, 2, 3 ], 2), [ 2, 3, 1 ])
	t.equal(rotate([ 1, 2, 3, 4 ], -2), [ 3, 4, 1, 2 ])
	t.equal(rotate([ 1, 2, 3, 4 ], 0), [ 1, 2, 3, 4 ])
	t.equal(rotate([ 1, 2, 3, 4 ], 2), [ 3, 4, 1, 2 ])
})
