const { test } = require('@xyz/testing')
const {
	includes,
	includesSorted,
	includesBy,
	includesBySorted,
	includesByPure,
	includesByPureSorted,
} = require('.')

test("array.includes", (t) => {
	t.equal(includes([], 1), false)
	t.equal(includes([ 1, 3, 2 ], 1), true)
	t.equal(includes([ 1, 3, 2 ], 2), true)
	t.equal(includes([ 1, 3, 2 ], 3), true)
	t.equal(includes([ 1, 3, 2 ], 0), false)
	t.equal(includes([ 1, 3, 2 ], 5), false)

	t.equal(includes([ 1, 3, 2 ], '1'), false) // !!!
})

test("array.includesSorted", (t) => {
	t.equal(includesSorted([], 1), false)
	t.equal(includesSorted([ 1, 2, 3 ], 1), true)
	t.equal(includesSorted([ 1, 2, 3 ], 2), true)
	t.equal(includesSorted([ 1, 2, 3 ], 3), true)
	t.equal(includesSorted([ 1, 2, 3 ], 0), false)
	t.equal(includesSorted([ 1, 2, 3 ], 5), false)

	t.equal(includesSorted([ 1, 2, 3 ], '1'), true) // !!!
})

test("array.includesBy", (t) => {
	t.equal(includesBy([], 1, (x) => 2 * x), false)
	t.equal(includesBy([ 1, 3, 2 ], 1, (x) => 2 * x), true)
	t.equal(includesBy([ 1, 3, 2 ], 2, (x) => 2 * x), true)
	t.equal(includesBy([ 1, 3, 2 ], 3, (x) => 2 * x), true)
	t.equal(includesBy([ 1, 3, 2 ], 0, (x) => 2 * x), false)
	t.equal(includesBy([ 1, 3, 2 ], 5, (x) => 2 * x), false)

	t.equal(includesBy([ 1, 3, 2 ], '1', (x) => 2 * x), true) // !!!
})

test("array.includesBySorted", (t) => {
	t.equal(includesBySorted([], 1, (x) => 2 * x), false)
	t.equal(includesBySorted([ 1, 2, 3 ], 1, (x) => 2 * x), true)
	t.equal(includesBySorted([ 1, 2, 3 ], 2, (x) => 2 * x), true)
	t.equal(includesBySorted([ 1, 2, 3 ], 3, (x) => 2 * x), true)
	t.equal(includesBySorted([ 1, 2, 3 ], 0, (x) => 2 * x), false)
	t.equal(includesBySorted([ 1, 2, 3 ], 5, (x) => 2 * x), false)

	t.equal(includesBySorted([ 1, 2, 3 ], '1', (x) => 2 * x), true) // !!!
})

test("array.includesByPure", (t) => {
	t.equal(includesByPure([], 1, (x) => 2 * x), false)
	t.equal(includesByPure([ 1, 3, 2 ], 1, (x) => 2 * x), true)
	t.equal(includesByPure([ 1, 3, 2 ], 2, (x) => 2 * x), true)
	t.equal(includesByPure([ 1, 3, 2 ], 3, (x) => 2 * x), true)
	t.equal(includesByPure([ 1, 3, 2 ], 0, (x) => 2 * x), false)
	t.equal(includesByPure([ 1, 3, 2 ], 5, (x) => 2 * x), false)

	t.equal(includesByPure([ 1, 3, 2 ], '1', (x) => 2 * x), true) // !!!
})

test("array.includesByPureSorted", (t) => {
	t.equal(includesByPureSorted([], 1, (x) => 2 * x), false)
	t.equal(includesByPureSorted([ 1, 2, 3 ], 1, (x) => 2 * x), true)
	t.equal(includesByPureSorted([ 1, 2, 3 ], 2, (x) => 2 * x), true)
	t.equal(includesByPureSorted([ 1, 2, 3 ], 3, (x) => 2 * x), true)
	t.equal(includesByPureSorted([ 1, 2, 3 ], 0, (x) => 2 * x), false)
	t.equal(includesByPureSorted([ 1, 2, 3 ], 5, (x) => 2 * x), false)

	t.equal(includesByPureSorted([ 1, 2, 3 ], '1', (x) => 2 * x), true) // !!!
})
