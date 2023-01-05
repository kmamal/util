const { test } = require('@kmamal/testing')
const {
	exponentialSearch,
	exponentialSearchFirst,
	exponentialSearchLast,
	exponentialSearchBy,
	exponentialSearchFirstBy,
	exponentialSearchLastBy,
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

test("array.exponentialSearchFirst", (t) => {
	t.equal(exponentialSearchFirst([], 0), 0)
	t.equal(exponentialSearchFirst([ 1 ], 0), 0)
	t.equal(exponentialSearchFirst([ 1 ], 1), 0)
	t.equal(exponentialSearchFirst([ 1 ], 2), 1)
	t.equal(exponentialSearchFirst([ 1, 2, 3 ], 0), 0)
	t.equal(exponentialSearchFirst([ 1, 2, 3 ], 1), 0)
	t.equal(exponentialSearchFirst([ 1, 2, 3 ], 2), 1)
	t.equal(exponentialSearchFirst([ 1, 2, 3 ], 3), 2)
	t.equal(exponentialSearchFirst([ 1, 2, 3 ], 4), 3)
	t.equal(exponentialSearchFirst([ 2, 2, 2 ], 2), 0)
})

test("array.exponentialSearchLast", (t) => {
	t.equal(exponentialSearchLast([], 0), 0)
	t.equal(exponentialSearchLast([ 1 ], 0), 0)
	t.equal(exponentialSearchLast([ 1 ], 1), 1)
	t.equal(exponentialSearchLast([ 1 ], 2), 1)
	t.equal(exponentialSearchLast([ 1, 2, 3 ], 0), 0)
	t.equal(exponentialSearchLast([ 1, 2, 3 ], 1), 1)
	t.equal(exponentialSearchLast([ 1, 2, 3 ], 2), 2)
	t.equal(exponentialSearchLast([ 1, 2, 3 ], 3), 3)
	t.equal(exponentialSearchLast([ 1, 2, 3 ], 4), 3)
	t.equal(exponentialSearchLast([ 2, 2, 2 ], 2), 3)
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

test("array.exponentialSearchFirstBy", (t) => {
	t.equal(exponentialSearchFirstBy([], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchFirstBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchFirstBy([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(exponentialSearchFirstBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchFirstBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchFirstBy([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(exponentialSearchFirstBy([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchFirstBy([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(exponentialSearchFirstBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(exponentialSearchFirstBy([ 2, 2, 2 ], 2, (x) => 2 * x), 0)
})

test("array.exponentialSearchLastBy", (t) => {
	t.equal(exponentialSearchLastBy([], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchLastBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchLastBy([ 1 ], 1, (x) => 2 * x), 1)
	t.equal(exponentialSearchLastBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(exponentialSearchLastBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(exponentialSearchLastBy([ 1, 2, 3 ], 1, (x) => 2 * x), 1)
	t.equal(exponentialSearchLastBy([ 1, 2, 3 ], 2, (x) => 2 * x), 2)
	t.equal(exponentialSearchLastBy([ 1, 2, 3 ], 3, (x) => 2 * x), 3)
	t.equal(exponentialSearchLastBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(exponentialSearchLastBy([ 2, 2, 2 ], 2, (x) => 2 * x), 3)
})
