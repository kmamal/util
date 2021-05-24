const { test } = require('@kmamal/testing')
const { range } = require('./range')

test("range.range", (t) => {
	t.equal([ ...range() ], [])
	t.equal([ ...range(0, 3) ], [ 0, 1, 2 ])
	t.equal([ ...range(1, 5) ], [ 1, 2, 3, 4 ])
	t.equal([ ...range(1, 5, 2) ], [ 1, 3 ])
	t.equal([ ...range(2, 7, 2) ], [ 2, 4, 6 ])
})
