const { test } = require('@kmamal/testing')
const { isSorted, isSortedBy } = require('./is-sorted')

test("array.isSorted", (t) => {
	t.equal(isSorted([]), true)
	t.equal(isSorted([ 1 ]), true)
	t.equal(isSorted([ 1, 1 ]), true)
	t.equal(isSorted([ 1, 2 ]), true)
	t.equal(isSorted([ 2, 1 ]), false)
	t.equal(isSorted([ 1, 2, 3 ]), true)
	t.equal(isSorted([ 1, 3, 2 ]), false)
})

test("array.isSortedBy", (t) => {
	t.equal(isSortedBy([], (x) => 2 * x), true)
	t.equal(isSortedBy([ 1 ], (x) => 2 * x), true)
	t.equal(isSortedBy([ 1, 1 ], (x) => 2 * x), true)
	t.equal(isSortedBy([ 1, 2 ], (x) => 2 * x), true)
	t.equal(isSortedBy([ 2, 1 ], (x) => 2 * x), false)
	t.equal(isSortedBy([ 1, 2, 3 ], (x) => 2 * x), true)
	t.equal(isSortedBy([ 1, 3, 2 ], (x) => 2 * x), false)
})
