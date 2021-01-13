const { test } = require('@xyz/testing')
const {
	interpolationSearch,
	interpolationSearchLeft,
	interpolationSearchRight,
	interpolationSearchBy,
	interpolationSearchLeftBy,
	interpolationSearchRightBy,
	interpolationSearchByPure,
	interpolationSearchLeftByPure,
	interpolationSearchRightByPure,
} = require('./interpolation')

test('array.interpolationSearch', (t) => {
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

test('array.interpolationSearchLeft', (t) => {
	t.equal(interpolationSearchLeft([], 0), 0)
	t.equal(interpolationSearchLeft([ 1 ], 0), 0)
	t.equal(interpolationSearchLeft([ 1 ], 1), 0)
	t.equal(interpolationSearchLeft([ 1 ], 2), 1)
	t.equal(interpolationSearchLeft([ 1, 2, 3 ], 0), 0)
	t.equal(interpolationSearchLeft([ 1, 2, 3 ], 1), 0)
	t.equal(interpolationSearchLeft([ 1, 2, 3 ], 2), 1)
	t.equal(interpolationSearchLeft([ 1, 2, 3 ], 3), 2)
	t.equal(interpolationSearchLeft([ 1, 2, 3 ], 4), 3)
	t.equal(interpolationSearchLeft([ 2, 2, 2 ], 2), 0)
})

test('array.interpolationSearchRight', (t) => {
	t.equal(interpolationSearchRight([], 0), 0)
	t.equal(interpolationSearchRight([ 1 ], 0), 0)
	t.equal(interpolationSearchRight([ 1 ], 1), 1)
	t.equal(interpolationSearchRight([ 1 ], 2), 1)
	t.equal(interpolationSearchRight([ 1, 2, 3 ], 0), 0)
	t.equal(interpolationSearchRight([ 1, 2, 3 ], 1), 1)
	t.equal(interpolationSearchRight([ 1, 2, 3 ], 2), 2)
	t.equal(interpolationSearchRight([ 1, 2, 3 ], 3), 3)
	t.equal(interpolationSearchRight([ 1, 2, 3 ], 4), 3)
	t.equal(interpolationSearchRight([ 2, 2, 2 ], 2), 3)
})

test('array.interpolationSearchBy', (t) => {
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

test('array.interpolationSearchLeftBy', (t) => {
	t.equal(interpolationSearchLeftBy([], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchLeftBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchLeftBy([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(interpolationSearchLeftBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(interpolationSearchLeftBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchLeftBy([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(interpolationSearchLeftBy([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(interpolationSearchLeftBy([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(interpolationSearchLeftBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(interpolationSearchLeftBy([ 2, 2, 2 ], 2, (x) => 2 * x), 0)
})

test('array.interpolationSearchRightBy', (t) => {
	t.equal(interpolationSearchRightBy([], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchRightBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchRightBy([ 1 ], 1, (x) => 2 * x), 1)
	t.equal(interpolationSearchRightBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(interpolationSearchRightBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchRightBy([ 1, 2, 3 ], 1, (x) => 2 * x), 1)
	t.equal(interpolationSearchRightBy([ 1, 2, 3 ], 2, (x) => 2 * x), 2)
	t.equal(interpolationSearchRightBy([ 1, 2, 3 ], 3, (x) => 2 * x), 3)
	t.equal(interpolationSearchRightBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(interpolationSearchRightBy([ 2, 2, 2 ], 2, (x) => 2 * x), 3)
})

test('array.interpolationSearchByPure', (t) => {
	t.equal(interpolationSearchByPure([], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchByPure([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchByPure([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(interpolationSearchByPure([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(interpolationSearchByPure([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchByPure([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(interpolationSearchByPure([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(interpolationSearchByPure([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(interpolationSearchByPure([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
})

test('array.interpolationSearchLeftByPure', (t) => {
	t.equal(interpolationSearchLeftByPure([], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchLeftByPure([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchLeftByPure([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(interpolationSearchLeftByPure([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(interpolationSearchLeftByPure([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchLeftByPure([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(interpolationSearchLeftByPure([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(interpolationSearchLeftByPure([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(interpolationSearchLeftByPure([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(interpolationSearchLeftByPure([ 2, 2, 2 ], 2, (x) => 2 * x), 0)
})

test('array.interpolationSearchRightByPure', (t) => {
	t.equal(interpolationSearchRightByPure([], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchRightByPure([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchRightByPure([ 1 ], 1, (x) => 2 * x), 1)
	t.equal(interpolationSearchRightByPure([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(interpolationSearchRightByPure([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(interpolationSearchRightByPure([ 1, 2, 3 ], 1, (x) => 2 * x), 1)
	t.equal(interpolationSearchRightByPure([ 1, 2, 3 ], 2, (x) => 2 * x), 2)
	t.equal(interpolationSearchRightByPure([ 1, 2, 3 ], 3, (x) => 2 * x), 3)
	t.equal(interpolationSearchRightByPure([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(interpolationSearchRightByPure([ 2, 2, 2 ], 2, (x) => 2 * x), 3)
})
