const { test } = require('@xyz/testing')
const {
	binarySearch,
	binarySearchLeft,
	binarySearchRight,
	binarySearchBy,
	binarySearchLeftBy,
	binarySearchRightBy,
	binarySearchByPure,
	binarySearchLeftByPure,
	binarySearchRightByPure,
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

test("array.binarySearchLeft", (t) => {
	t.equal(binarySearchLeft([], 0), 0)
	t.equal(binarySearchLeft([ 1 ], 0), 0)
	t.equal(binarySearchLeft([ 1 ], 1), 0)
	t.equal(binarySearchLeft([ 1 ], 2), 1)
	t.equal(binarySearchLeft([ 1, 2, 3 ], 0), 0)
	t.equal(binarySearchLeft([ 1, 2, 3 ], 1), 0)
	t.equal(binarySearchLeft([ 1, 2, 3 ], 2), 1)
	t.equal(binarySearchLeft([ 1, 2, 3 ], 3), 2)
	t.equal(binarySearchLeft([ 1, 2, 3 ], 4), 3)
	t.equal(binarySearchLeft([ 2, 2, 2 ], 2), 0)
})

test("array.binarySearchRight", (t) => {
	t.equal(binarySearchRight([], 0), 0)
	t.equal(binarySearchRight([ 1 ], 0), 0)
	t.equal(binarySearchRight([ 1 ], 1), 1)
	t.equal(binarySearchRight([ 1 ], 2), 1)
	t.equal(binarySearchRight([ 1, 2, 3 ], 0), 0)
	t.equal(binarySearchRight([ 1, 2, 3 ], 1), 1)
	t.equal(binarySearchRight([ 1, 2, 3 ], 2), 2)
	t.equal(binarySearchRight([ 1, 2, 3 ], 3), 3)
	t.equal(binarySearchRight([ 1, 2, 3 ], 4), 3)
	t.equal(binarySearchRight([ 2, 2, 2 ], 2), 3)
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

test("array.binarySearchLeftBy", (t) => {
	t.equal(binarySearchLeftBy([], 0, (x) => 2 * x), 0)
	t.equal(binarySearchLeftBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(binarySearchLeftBy([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(binarySearchLeftBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(binarySearchLeftBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(binarySearchLeftBy([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(binarySearchLeftBy([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(binarySearchLeftBy([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(binarySearchLeftBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(binarySearchLeftBy([ 2, 2, 2 ], 2, (x) => 2 * x), 0)
})

test("array.binarySearchRightBy", (t) => {
	t.equal(binarySearchRightBy([], 0, (x) => 2 * x), 0)
	t.equal(binarySearchRightBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(binarySearchRightBy([ 1 ], 1, (x) => 2 * x), 1)
	t.equal(binarySearchRightBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(binarySearchRightBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(binarySearchRightBy([ 1, 2, 3 ], 1, (x) => 2 * x), 1)
	t.equal(binarySearchRightBy([ 1, 2, 3 ], 2, (x) => 2 * x), 2)
	t.equal(binarySearchRightBy([ 1, 2, 3 ], 3, (x) => 2 * x), 3)
	t.equal(binarySearchRightBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(binarySearchRightBy([ 2, 2, 2 ], 2, (x) => 2 * x), 3)
})

test("array.binarySearchByPure", (t) => {
	t.equal(binarySearchByPure([], 0, (x) => 2 * x), 0)
	t.equal(binarySearchByPure([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(binarySearchByPure([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(binarySearchByPure([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(binarySearchByPure([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(binarySearchByPure([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(binarySearchByPure([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(binarySearchByPure([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(binarySearchByPure([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
})

test("array.binarySearchLeftByPure", (t) => {
	t.equal(binarySearchLeftByPure([], 0, (x) => 2 * x), 0)
	t.equal(binarySearchLeftByPure([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(binarySearchLeftByPure([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(binarySearchLeftByPure([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(binarySearchLeftByPure([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(binarySearchLeftByPure([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(binarySearchLeftByPure([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(binarySearchLeftByPure([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(binarySearchLeftByPure([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(binarySearchLeftByPure([ 2, 2, 2 ], 2, (x) => 2 * x), 0)
})

test("array.binarySearchRightByPure", (t) => {
	t.equal(binarySearchRightByPure([], 0, (x) => 2 * x), 0)
	t.equal(binarySearchRightByPure([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(binarySearchRightByPure([ 1 ], 1, (x) => 2 * x), 1)
	t.equal(binarySearchRightByPure([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(binarySearchRightByPure([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(binarySearchRightByPure([ 1, 2, 3 ], 1, (x) => 2 * x), 1)
	t.equal(binarySearchRightByPure([ 1, 2, 3 ], 2, (x) => 2 * x), 2)
	t.equal(binarySearchRightByPure([ 1, 2, 3 ], 3, (x) => 2 * x), 3)
	t.equal(binarySearchRightByPure([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(binarySearchRightByPure([ 2, 2, 2 ], 2, (x) => 2 * x), 3)
})
