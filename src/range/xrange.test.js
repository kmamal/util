const { test } = require('@xyz/testing')
const { xrange } = require('./xrange')

test("range.xrange", (t) => {
	t.equal([ ...xrange() ], [])
	t.equal([ ...xrange(0, 3) ], [ 2, 1, 0 ])
	t.equal([ ...xrange(1, 5) ], [ 4, 3, 2, 1 ])
	t.equal([ ...xrange(1, 5, 2) ], [ 3, 1 ])
	t.equal([ ...xrange(2, 7, 2) ], [ 6, 4, 2 ])
})
