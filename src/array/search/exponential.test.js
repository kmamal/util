const { test } = require('@xyz/testing')
const {
	exponentialSearch,
	exponentialSearchLeft,
	exponentialSearchRight,
	exponentialSearchBy,
	exponentialSearchLeftBy,
	exponentialSearchRightBy,
	exponentialSearchByPure,
	exponentialSearchLeftByPure,
	exponentialSearchRightByPure,
} = require('./exponential')

test("array.exponentialSearch", (t) => {
	t.equal(exponentialSearch([], 0), 0)
	t.equal(exponentialSearch([ 1 ], 0), 0)
	t.equal(exponentialSearch([ 1 ], 1), 0)
	t.equal(exponentialSearch([ 1 ], 2), 1)
	t.equal(exponentialSearch([ 1, 2, 3 ], 0), 0)
	t.equal(exponentialSearch([ 1, 2, 3 ], 1), 0)
	t.equal(exponentialSearch([ 1, 2, 3 ], 2), 1)
	t.equal(exponentialSearch([ 1, 2, 3 ], 3), 2)
	t.equal(exponentialSearch([ 1, 2, 3 ], 4), 3)
})

test("array.exponentialSearchLeft", (t) => {
	t.equal(exponentialSearchLeft([], 0), 0)
	t.equal(exponentialSearchLeft([ 1 ], 0), 0)
	t.equal(exponentialSearchLeft([ 1 ], 1), 0)
	t.equal(exponentialSearchLeft([ 1 ], 2), 1)
	t.equal(exponentialSearchLeft([ 1, 2, 3 ], 0), 0)
	t.equal(exponentialSearchLeft([ 1, 2, 3 ], 1), 0)
	t.equal(exponentialSearchLeft([ 1, 2, 3 ], 2), 1)
	t.equal(exponentialSearchLeft([ 1, 2, 3 ], 3), 2)
	t.equal(exponentialSearchLeft([ 1, 2, 3 ], 4), 3)
	t.equal(exponentialSearchLeft([ 2, 2, 2 ], 2), 0)
})

test("array.exponentialSearchRight", (t) => {
	t.equal(exponentialSearchRight([], 0), 0)
	t.equal(exponentialSearchRight([ 1 ], 0), 0)
	t.equal(exponentialSearchRight([ 1 ], 1), 1)
	t.equal(exponentialSearchRight([ 1 ], 2), 1)
	t.equal(exponentialSearchRight([ 1, 2, 3 ], 0), 0)
	t.equal(exponentialSearchRight([ 1, 2, 3 ], 1), 1)
	t.equal(exponentialSearchRight([ 1, 2, 3 ], 2), 2)
	t.equal(exponentialSearchRight([ 1, 2, 3 ], 3), 3)
	t.equal(exponentialSearchRight([ 1, 2, 3 ], 4), 3)
	t.equal(exponentialSearchRight([ 2, 2, 2 ], 2), 3)
})

test("array.exponentialSearchBy", (t) => {
	t.equal(exponentialSearchBy([], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchBy([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(exponentialSearchBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchBy([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(exponentialSearchBy([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchBy([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(exponentialSearchBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
})

test("array.exponentialSearchLeftBy", (t) => {
	t.equal(exponentialSearchLeftBy([], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchLeftBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchLeftBy([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(exponentialSearchLeftBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchLeftBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchLeftBy([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(exponentialSearchLeftBy([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchLeftBy([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(exponentialSearchLeftBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(exponentialSearchLeftBy([ 2, 2, 2 ], 2, (x) => 2 * x), 0)
})

test("array.exponentialSearchRightBy", (t) => {
	t.equal(exponentialSearchRightBy([], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchRightBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchRightBy([ 1 ], 1, (x) => 2 * x), 1)
	t.equal(exponentialSearchRightBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchRightBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchRightBy([ 1, 2, 3 ], 1, (x) => 2 * x), 1)
	t.equal(exponentialSearchRightBy([ 1, 2, 3 ], 2, (x) => 2 * x), 2)
	t.equal(exponentialSearchRightBy([ 1, 2, 3 ], 3, (x) => 2 * x), 3)
	t.equal(exponentialSearchRightBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(exponentialSearchRightBy([ 2, 2, 2 ], 2, (x) => 2 * x), 3)
})

test("array.exponentialSearchByPure", (t) => {
	t.equal(exponentialSearchByPure([], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchByPure([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchByPure([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(exponentialSearchByPure([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchByPure([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchByPure([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(exponentialSearchByPure([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchByPure([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(exponentialSearchByPure([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
})

test("array.exponentialSearchLeftByPure", (t) => {
	t.equal(exponentialSearchLeftByPure([], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchLeftByPure([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchLeftByPure([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(exponentialSearchLeftByPure([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchLeftByPure([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchLeftByPure([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(exponentialSearchLeftByPure([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchLeftByPure([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(exponentialSearchLeftByPure([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(exponentialSearchLeftByPure([ 2, 2, 2 ], 2, (x) => 2 * x), 0)
})

test("array.exponentialSearchRightByPure", (t) => {
	t.equal(exponentialSearchRightByPure([], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchRightByPure([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchRightByPure([ 1 ], 1, (x) => 2 * x), 1)
	t.equal(exponentialSearchRightByPure([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchRightByPure([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchRightByPure([ 1, 2, 3 ], 1, (x) => 2 * x), 1)
	t.equal(exponentialSearchRightByPure([ 1, 2, 3 ], 2, (x) => 2 * x), 2)
	t.equal(exponentialSearchRightByPure([ 1, 2, 3 ], 3, (x) => 2 * x), 3)
	t.equal(exponentialSearchRightByPure([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(exponentialSearchRightByPure([ 2, 2, 2 ], 2, (x) => 2 * x), 3)
})
