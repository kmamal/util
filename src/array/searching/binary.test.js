const { test } = require('@kmamal/testing')
const {
	binarySearch,
	binarySearchFirst,
	binarySearchLast,
	binarySearchBy,
	binarySearchFirstBy,
	binarySearchLastBy,
} = require('./binary')

test("array.binarySearch", (t) => {
	t.equal(binarySearch([], 0), 0)
	t.equal(binarySearch([ 1 ], 0), 0)
	t.equal(binarySearch([ 1 ], 1), 0)
	t.equal(binarySearch([ 1 ], 2), 1)
	t.equal(binarySearch([ 1, 2, 3 ], 0), 0)
	t.equal(binarySearch([ 1, 2, 3 ], 1), 0)
	t.equal(binarySearch([ 1, 2, 3 ], 2), 1)
	t.equal(binarySearch([ 1, 2, 3 ], 3), 2)
	t.equal(binarySearch([ 1, 2, 3 ], 4), 3)
})

test("array.binarySearchFirst", (t) => {
	t.equal(binarySearchFirst([], 0), 0)
	t.equal(binarySearchFirst([ 1 ], 0), 0)
	t.equal(binarySearchFirst([ 1 ], 1), 0)
	t.equal(binarySearchFirst([ 1 ], 2), 1)
	t.equal(binarySearchFirst([ 1, 2, 3 ], 0), 0)
	t.equal(binarySearchFirst([ 1, 2, 3 ], 1), 0)
	t.equal(binarySearchFirst([ 1, 2, 3 ], 2), 1)
	t.equal(binarySearchFirst([ 1, 2, 3 ], 3), 2)
	t.equal(binarySearchFirst([ 1, 2, 3 ], 4), 3)
	t.equal(binarySearchFirst([ 2, 2, 2 ], 2), 0)
})

test("array.binarySearchLast", (t) => {
	t.equal(binarySearchLast([], 0), 0)
	t.equal(binarySearchLast([ 1 ], 0), 0)
	t.equal(binarySearchLast([ 1 ], 1), 1)
	t.equal(binarySearchLast([ 1 ], 2), 1)
	t.equal(binarySearchLast([ 1, 2, 3 ], 0), 0)
	t.equal(binarySearchLast([ 1, 2, 3 ], 1), 1)
	t.equal(binarySearchLast([ 1, 2, 3 ], 2), 2)
	t.equal(binarySearchLast([ 1, 2, 3 ], 3), 3)
	t.equal(binarySearchLast([ 1, 2, 3 ], 4), 3)
	t.equal(binarySearchLast([ 2, 2, 2 ], 2), 3)
})

test("array.binarySearchBy", (t) => {
	t.equal(binarySearchBy([], 0, (x) => 2 * x), 0)
	t.equal(binarySearchBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(binarySearchBy([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(binarySearchBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(binarySearchBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(binarySearchBy([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(binarySearchBy([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(binarySearchBy([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(binarySearchBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
})

test("array.binarySearchFirstBy", (t) => {
	t.equal(binarySearchFirstBy([], 0, (x) => 2 * x), 0)
	t.equal(binarySearchFirstBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(binarySearchFirstBy([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(binarySearchFirstBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(binarySearchFirstBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(binarySearchFirstBy([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(binarySearchFirstBy([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(binarySearchFirstBy([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(binarySearchFirstBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(binarySearchFirstBy([ 2, 2, 2 ], 2, (x) => 2 * x), 0)
})

test("array.binarySearchLastBy", (t) => {
	t.equal(binarySearchLastBy([], 0, (x) => 2 * x), 0)
	t.equal(binarySearchLastBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(binarySearchLastBy([ 1 ], 1, (x) => 2 * x), 1)
	t.equal(binarySearchLastBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(binarySearchLastBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(binarySearchLastBy([ 1, 2, 3 ], 1, (x) => 2 * x), 1)
	t.equal(binarySearchLastBy([ 1, 2, 3 ], 2, (x) => 2 * x), 2)
	t.equal(binarySearchLastBy([ 1, 2, 3 ], 3, (x) => 2 * x), 3)
	t.equal(binarySearchLastBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(binarySearchLastBy([ 2, 2, 2 ], 2, (x) => 2 * x), 3)
})
