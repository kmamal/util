const { test } = require('@xyz/testing')
const { filter } = require('.')

test('iterable.filter', (t) => {
	t.equal([ ...filter([], (x) => x % 2) ], [])
	t.equal([ ...filter([ 1, 2, 3 ], () => false) ], [])
	t.equal([ ...filter([ 1, 2, 3 ], () => true) ], [ 1, 2, 3 ])
	t.equal([ ...filter([ 1, 2, 3 ], (x) => x % 2) ], [ 1, 3 ])
})
