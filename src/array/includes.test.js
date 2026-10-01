const { test } = require('@kmamal/testing')
const {
	__includes,
	__includesSorted,
	// includes,
	// includesSorted,
	includesBy,
	includesBySorted,
} = require('./includes')

// test("array.includes", (t) => {
// 	t.equal(includes([], 1), false)
// 	t.equal(includes([ 1, 3, 2 ], 1), true)
// 	t.equal(includes([ 1, 3, 2 ], 2), true)
// 	t.equal(includes([ 1, 3, 2 ], 3), true)
// 	t.equal(includes([ 1, 3, 2 ], 0), false)
// 	t.equal(includes([ 1, 3, 2 ], 5), false)

// 	t.equal(includes([ 1, 3, 2 ], '1'), false) // !!!
// })

// test("array.includesSorted", (t) => {
// 	t.equal(includesSorted([], 1), false)
// 	t.equal(includesSorted([ 1, 2, 3 ], 1), true)
// 	t.equal(includesSorted([ 1, 2, 3 ], 2), true)
// 	t.equal(includesSorted([ 1, 2, 3 ], 3), true)
// 	t.equal(includesSorted([ 1, 2, 3 ], 0), false)
// 	t.equal(includesSorted([ 1, 2, 3 ], 5), false)

// 	t.equal(includesSorted([ 1, 2, 3 ], '1'), true) // !!!
// })

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

test("array.includesBy grouping", (t) => {
	const fn = (x) => Math.floor(x / 10)
	t.equal(includesBy([ 1, 12 ], 18, fn), true)
	t.equal(includesBy([ 1, 23 ], 18, fn), false)
	t.equal(includesBySorted([ 1, 12 ], 18, fn), true)
	t.equal(includesBySorted([ 1, 23 ], 18, fn), false)
})

test("array.__includes", (t) => {
	const eq = (a, b) => a === b
	const arr = [ 1, 2, 3, 4 ]
	t.equal(__includes(arr, 1, 3, 2, eq), true)
	t.equal(__includes(arr, 1, 3, 3, eq), true)
	t.equal(__includes(arr, 1, 3, 1, eq), false)
	t.equal(__includes(arr, 1, 3, 4, eq), false)
	t.equal(__includes(arr, 1, 2, 2, eq), true)
	t.equal(__includes(arr, 1, 1, 2, eq), false)
	t.equal(__includes(arr, 1, 3, null, (y) => y > 2), true)
})

test("array.__includesSorted", (t) => {
	const cmp = (a, b) => a - b
	const arr = [ 1, 2, 3, 5 ]
	t.equal(__includesSorted(arr, 1, 3, 2, cmp), true)
	t.equal(__includesSorted(arr, 1, 3, 3, cmp), true)
	t.equal(__includesSorted(arr, 1, 3, 1, cmp), false)
	t.equal(__includesSorted(arr, 1, 3, 5, cmp), false)
	t.equal(__includesSorted(arr, 1, 3, 4, cmp), false)
	t.equal(__includesSorted(arr, 1, 2, 2, cmp), true)
	t.equal(__includesSorted(arr, 1, 1, 2, cmp), false)

	const big = Array.from({ length: 12000 }, (_, i) => i * 2)
	t.equal(__includesSorted(big, 1000, 11000, 2000, cmp), true)
	t.equal(__includesSorted(big, 1000, 11000, 21998, cmp), true)
	t.equal(__includesSorted(big, 1000, 11000, 1998, cmp), false)
	t.equal(__includesSorted(big, 1000, 11000, 22000, cmp), false)
	t.equal(__includesSorted(big, 1000, 11000, 5001, cmp), false)
})
