const { test } = require('@xyz/testing')
const { interpose } = require('.')

test('array.interpose', (t) => {
	t.equal(interpose([], 0), [])
	t.equal(interpose([ 1 ], 0), [ 1 ])
	t.equal(interpose([ 1, 2 ], 0), [ 1, 0, 2 ])
	t.equal(interpose([ 1, 2, 3 ], 0), [ 1, 0, 2, 0, 3 ])
})
