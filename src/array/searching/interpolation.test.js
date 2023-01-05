const { test } = require('@kmamal/testing')
const {
	interpolationSearch,
	interpolationSearchFirst,
	interpolationSearchLast,
	interpolationSearchBy,
	interpolationSearchFirstBy,
	interpolationSearchLastBy,
} = require('./interpolation')

test("array.interpolationSearch", (t) => {
	t.equal(interpolationSearch([], 0), 0)
	t.equal(interpolationSearch([ 1 ], 0), 0)
	t.equal(interpolationSearch([ 1 ], 1), 0)
	t.equal(interpolationSearch([ 1 ], 2), 1)
	t.equal(interpolationSearch([ 1, 2, 3 ], 0), 0)
	t.equal(interpolationSearch([ 1, 2, 3 ], 1), 0)
	t.equal(interpolationSearch([ 1, 2, 3 ], 2), 1)
	t.equal(interpolationSearch([ 1, 2, 3 ], 3), 2)
	t.equal(interpolationSearch([ 1, 2, 3 ], 4), 3)
})

test("array.interpolationSearchFirst", (t) => {
	t.equal(interpolationSearchFirst([], 0), 0)
	t.equal(interpolationSearchFirst([ 1 ], 0), 0)
	t.equal(interpolationSearchFirst([ 1 ], 1), 0)
	t.equal(interpolationSearchFirst([ 1 ], 2), 1)
	t.equal(interpolationSearchFirst([ 1, 2, 3 ], 0), 0)
	t.equal(interpolationSearchFirst([ 1, 2, 3 ], 1), 0)
	t.equal(interpolationSearchFirst([ 1, 2, 3 ], 2), 1)
	t.equal(interpolationSearchFirst([ 1, 2, 3 ], 3), 2)
	t.equal(interpolationSearchFirst([ 1, 2, 3 ], 4), 3)
	t.equal(interpolationSearchFirst([ 2, 2, 2 ], 2), 0)
})

test("array.interpolationSearchLast", (t) => {
	t.equal(interpolationSearchLast([], 0), 0)
	t.equal(interpolationSearchLast([ 1 ], 0), 0)
	t.equal(interpolationSearchLast([ 1 ], 1), 1)
	t.equal(interpolationSearchLast([ 1 ], 2), 1)
	t.equal(interpolationSearchLast([ 1, 2, 3 ], 0), 0)
	t.equal(interpolationSearchLast([ 1, 2, 3 ], 1), 1)
	t.equal(interpolationSearchLast([ 1, 2, 3 ], 2), 2)
	t.equal(interpolationSearchLast([ 1, 2, 3 ], 3), 3)
	t.equal(interpolationSearchLast([ 1, 2, 3 ], 4), 3)
	t.equal(interpolationSearchLast([ 2, 2, 2 ], 2), 3)
})

test("array.interpolationSearchBy", (t) => {
	t.equal(interpolationSearchBy([], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchBy([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(interpolationSearchBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(interpolationSearchBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchBy([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(interpolationSearchBy([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(interpolationSearchBy([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(interpolationSearchBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
})

test("array.interpolationSearchFirstBy", (t) => {
	t.equal(interpolationSearchFirstBy([], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchFirstBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchFirstBy([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(interpolationSearchFirstBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(interpolationSearchFirstBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchFirstBy([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(interpolationSearchFirstBy([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(interpolationSearchFirstBy([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(interpolationSearchFirstBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(interpolationSearchFirstBy([ 2, 2, 2 ], 2, (x) => 2 * x), 0)
})

test("array.interpolationSearchLastBy", (t) => {
	t.equal(interpolationSearchLastBy([], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchLastBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchLastBy([ 1 ], 1, (x) => 2 * x), 1)
	t.equal(interpolationSearchLastBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(interpolationSearchLastBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchLastBy([ 1, 2, 3 ], 1, (x) => 2 * x), 1)
	t.equal(interpolationSearchLastBy([ 1, 2, 3 ], 2, (x) => 2 * x), 2)
	t.equal(interpolationSearchLastBy([ 1, 2, 3 ], 3, (x) => 2 * x), 3)
	t.equal(interpolationSearchLastBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(interpolationSearchLastBy([ 2, 2, 2 ], 2, (x) => 2 * x), 3)
})
