const { test } = require('@xyz/testing')
const { xor, xorSorted } = require('.')

test('array.xor', (t) => {
	t.equal(xor([], []), [])
	t.equal(xor([], [ 1 ]), [ 1 ])
	t.equal(xor([ 1 ], []), [ 1 ])
	t.equal(xor([ 1, 3, 2 ], []), [ 1, 3, 2 ])
	t.equal(xor([], [ 1, 3, 2 ]), [ 1, 3, 2 ])
	t.equal(xor([ 1, 3, 2, 5 ], [ 3, 2, 4 ]), [ 1, 5, 4 ])
})

test('array.xorSorted', (t) => {
	t.equal(xorSorted([], []), [])
	t.equal(xorSorted([], [ 1 ]), [ 1 ])
	t.equal(xorSorted([ 1 ], []), [ 1 ])
	t.equal(xorSorted([ 1, 2, 3 ], []), [ 1, 2, 3 ])
	t.equal(xorSorted([], [ 1, 2, 3 ]), [ 1, 2, 3 ])
	t.equal(xorSorted([ 1, 2, 3, 5 ], [ 2, 3, 4 ]), [ 1, 4, 5 ])
})
