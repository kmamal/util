const { test } = require('@xyz/tests')
const { interweave } = require('.')

test('array.interweave', (t) => {
	t.equal(interweave([], []), [])
	t.equal(interweave([], [ 1 ]), [ 1 ])
	t.equal(interweave([ 1 ], []), [ 1 ])
	t.equal(interweave([ 1 ], [ 2 ]), [ 1, 2 ])
	t.equal(interweave([ 1, 3, 5 ], [ 2, 4 ]), [ 1, 2, 3, 4, 5 ])
	t.equal(interweave([ 1, 3, 5, 6, 7 ], [ 2, 4 ]), [ 1, 2, 3, 4, 5, 6, 7 ])
	t.equal(interweave([ 1, 3 ], [ 2, 4, 5, 6, 7 ]), [ 1, 2, 3, 4, 5, 6, 7 ])
})
