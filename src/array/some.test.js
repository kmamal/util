const { test } = require('@kmamal/testing')
const { some } = require('./some')

test("array.some", (t) => {
	t.equal(some([], () => true), false)
	t.equal(some([ 1, 2, 3 ], () => false), false)
	t.equal(some([ 1, 2, 3 ], () => true), true)
	t.equal(some([ 1, 2, 3 ], (x) => x > 2), true)
	t.equal(some([ 1, 2, 3 ], (x) => x > 5), false)
})
