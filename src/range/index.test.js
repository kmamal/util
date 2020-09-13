const { test } = require('@xyz/tests')
const { range, xrange } = require('.')

test('range.range', (t) => {
	t.equal([ ...range() ], [])
	t.equal([ ...range(0, 3) ], [ 0, 1, 2 ])
	t.equal([ ...range(1, 5) ], [ 1, 2, 3, 4 ])
	t.equal([ ...range(1, 5, 2) ], [ 1, 3 ])
	t.equal([ ...range(2, 7, 2) ], [ 2, 4, 6 ])
})

test('range.xrange', (t) => {
	t.equal([ ...xrange() ], [])
	t.equal([ ...xrange(0, 3) ], [ 2, 1, 0 ])
	t.equal([ ...xrange(1, 5) ], [ 4, 3, 2, 1 ])
	t.equal([ ...xrange(1, 5, 2) ], [ 3, 1 ])
	t.equal([ ...xrange(2, 7, 2) ], [ 6, 4, 2 ])
})
