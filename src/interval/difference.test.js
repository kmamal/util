const { test } = require('@xyz/testing')
const { difference } = require('./difference')
const { from } = require('./from')

test('intervals.difference', (t) => {
	t.equal(difference([ 1, 2 ], from(2, 3, true, true)), [ 1, 2 ])
	t.equal(difference([ 2, 4 ], from(1, 3, true, true)), [ 3, 4 ])
	t.equal(difference([ 1, 3 ], from(2, 4, true, true)), [ 1, 2 ])

	t.equal(difference([ 1, 2 ], [ 1, 2 ]), null)
	t.equal(difference([ 2, 3 ], [ 1, 4 ]), null)
	t.equal(difference([ 1, 4 ], [ 2, 3 ]), null)
})
