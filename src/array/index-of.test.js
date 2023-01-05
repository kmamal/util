const { test } = require('@kmamal/testing')
const {
	indexOf,
	indexOfRight,
	indexOfSorted,
	indexOfSortedRight,
	indexOfBy,
	indexOfByRight,
	indexOfBySorted,
	indexOfBySortedRight,
} = require('./index-of')

test("array.indexOf", (t) => {
	t.equal(indexOf([], 1), -1)
	t.equal(indexOf([], undefined), -1)
	t.equal(indexOf([ 1 ], 1), 0)
	t.equal(indexOf([ 1 ], 2), -1)
	t.equal(indexOf([ 1, 2, 3 ], 1), 0)
	t.equal(indexOf([ 1, 2, 3 ], 2), 1)
	t.equal(indexOf([ 1, 2, 3 ], 3), 2)
	t.equal(indexOf([ 1, 2, 3 ], 0), -1)
	t.equal(indexOf([ 1, 2, 3 ], 5), -1)
})

test("array.indexOfRight", (t) => {
	t.equal(indexOfRight([], 1), -1)
	t.equal(indexOfRight([], undefined), -1)
	t.equal(indexOfRight([ 1 ], 1), 0)
	t.equal(indexOfRight([ 1 ], 2), -1)
	t.equal(indexOfRight([ 1, 2, 3 ], 1), 0)
	t.equal(indexOfRight([ 1, 2, 3 ], 2), 1)
	t.equal(indexOfRight([ 1, 2, 3 ], 3), 2)
	t.equal(indexOfRight([ 1, 2, 3 ], 0), -1)
	t.equal(indexOfRight([ 1, 2, 3 ], 5), -1)
})

test("array.indexOfSorted", (t) => {
	t.equal(indexOfSorted([], 1), -1)
	t.equal(indexOfSorted([], undefined), -1)
	t.equal(indexOfSorted([ 1 ], 1), 0)
	t.equal(indexOfSorted([ 1 ], 2), -1)
	t.equal(indexOfSorted([ 1, 2, 3 ], 1), 0)
	t.equal(indexOfSorted([ 1, 2, 3 ], 2), 1)
	t.equal(indexOfSorted([ 1, 2, 3 ], 3), 2)
	t.equal(indexOfSorted([ 1, 2, 3 ], 0), -1)
	t.equal(indexOfSorted([ 1, 2, 3 ], 5), -1)
})

test("array.indexOfSortedRight", (t) => {
	t.equal(indexOfSortedRight([], 1), -1)
	t.equal(indexOfSortedRight([], undefined), -1)
	t.equal(indexOfSortedRight([ 1 ], 1), 0)
	t.equal(indexOfSortedRight([ 1 ], 2), -1)
	t.equal(indexOfSortedRight([ 1, 2, 3 ], 1), 0)
	t.equal(indexOfSortedRight([ 1, 2, 3 ], 2), 1)
	t.equal(indexOfSortedRight([ 1, 2, 3 ], 3), 2)
	t.equal(indexOfSortedRight([ 1, 2, 3 ], 0), -1)
	t.equal(indexOfSortedRight([ 1, 2, 3 ], 5), -1)
})

test("array.indexOfBy", (t) => {
	t.equal(indexOfBy([], 1, (x) => 2 * x), -1)
	t.equal(indexOfBy([], undefined, (x) => 2 * x), -1)
	t.equal(indexOfBy([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(indexOfBy([ 1 ], 2, (x) => 2 * x), -1)
	t.equal(indexOfBy([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(indexOfBy([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(indexOfBy([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(indexOfBy([ 1, 2, 3 ], 0, (x) => 2 * x), -1)
	t.equal(indexOfBy([ 1, 2, 3 ], 5, (x) => 2 * x), -1)
})

test("array.indexOfByRight", (t) => {
	t.equal(indexOfByRight([], 1, (x) => 2 * x), -1)
	t.equal(indexOfByRight([], undefined, (x) => 2 * x), -1)
	t.equal(indexOfByRight([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(indexOfByRight([ 1 ], 2, (x) => 2 * x), -1)
	t.equal(indexOfByRight([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(indexOfByRight([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(indexOfByRight([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(indexOfByRight([ 1, 2, 3 ], 0, (x) => 2 * x), -1)
	t.equal(indexOfByRight([ 1, 2, 3 ], 5, (x) => 2 * x), -1)
})

test("array.indexOfBySorted", (t) => {
	t.equal(indexOfBySorted([], 1, (x) => 2 * x), -1)
	t.equal(indexOfBySorted([], undefined, (x) => 2 * x), -1)
	t.equal(indexOfBySorted([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(indexOfBySorted([ 1 ], 2, (x) => 2 * x), -1)
	t.equal(indexOfBySorted([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(indexOfBySorted([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(indexOfBySorted([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(indexOfBySorted([ 1, 2, 3 ], 0, (x) => 2 * x), -1)
	t.equal(indexOfBySorted([ 1, 2, 3 ], 5, (x) => 2 * x), -1)
})

test("array.indexOfBySortedRight", (t) => {
	t.equal(indexOfBySortedRight([], 1, (x) => 2 * x), -1)
	t.equal(indexOfBySortedRight([], undefined, (x) => 2 * x), -1)
	t.equal(indexOfBySortedRight([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(indexOfBySortedRight([ 1 ], 2, (x) => 2 * x), -1)
	t.equal(indexOfBySortedRight([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(indexOfBySortedRight([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(indexOfBySortedRight([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(indexOfBySortedRight([ 1, 2, 3 ], 0, (x) => 2 * x), -1)
	t.equal(indexOfBySortedRight([ 1, 2, 3 ], 5, (x) => 2 * x), -1)
})
