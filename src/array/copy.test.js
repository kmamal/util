const { test } = require('@xyz/tests')
const { copy } = require('.')

test('array.copy', (t) => {
	t.equal(copy([], 0, [], 1, 1), [])
	t.equal(copy([ 1 ], 0, [ 2 ], 0, 1), [ 2 ])
	t.equal(copy([ 1 ], 1, [ 2 ], 0, 1), [ 1, 2 ])
	t.equal(copy([ 1, 2, 3 ], 0, [ 1, 2, 3 ], 1, 3), [ 2, 3, 3 ])
	t.equal(copy([ 1, 2, 3 ], 1, [ 1, 2, 3 ], 0, 2), [ 1, 1, 2 ])
	t.equal(copy([ 1, 2, 3 ], 1, [ 1, 2, 3 ], 0, 3), [ 1, 1, 2, 3 ])
})

test('array.copy.$$$', (t) => {
	t.equal(copy.$$$([], 0, [], 1, 1), [])
	t.equal(copy.$$$([ 1 ], 0, [ 2 ], 0, 1), [ 2 ])
	t.equal(copy.$$$([ 1 ], 1, [ 2 ], 0, 1), [ 1, 2 ])
	t.equal(copy.$$$([ 1, 2, 3 ], 0, [ 1, 2, 3 ], 1, 3), [ 2, 3, 3 ])
	t.equal(copy.$$$([ 1, 2, 3 ], 1, [ 1, 2, 3 ], 0, 2), [ 1, 1, 2 ])
	t.equal(copy.$$$([ 1, 2, 3 ], 1, [ 1, 2, 3 ], 0, 3), [ 1, 1, 2, 3 ])
})
