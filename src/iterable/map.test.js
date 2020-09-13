const { test } = require('@xyz/tests')
const { map } = require('.')

test('iterable.map', (t) => {
	t.equal([ ...map([], (x) => 2 * x) ], [])
	t.equal([ ...map([ 1, 2, 3 ], (x) => 2 * x) ], [ 2, 4, 6 ])
})
