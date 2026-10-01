const { test } = require('@kmamal/testing')
const {
	__indexOf,
	__indexOfRight,
	__indexOfSorted,
	__indexOfSortedRight,
	// indexOf,
	indexOfRight,
	// indexOfSorted,
	indexOfSortedRight,
	indexOfBy,
	indexOfByRight,
	indexOfBySorted,
	indexOfBySortedRight,
} = require('./index-of')

// test("array.indexOf", (t) => {
// 	t.equal(indexOf([], 1), -1)
// 	t.equal(indexOf([], undefined), -1)
// 	t.equal(indexOf([ 1 ], 1), 0)
// 	t.equal(indexOf([ 1 ], 2), -1)
// 	t.equal(indexOf([ 1, 2, 3 ], 1), 0)
// 	t.equal(indexOf([ 1, 2, 3 ], 2), 1)
// 	t.equal(indexOf([ 1, 2, 3 ], 3), 2)
// 	t.equal(indexOf([ 1, 2, 3 ], 0), -1)
// 	t.equal(indexOf([ 1, 2, 3 ], 5), -1)
// })

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

// test("array.indexOfSorted", (t) => {
// 	t.equal(indexOfSorted([], 1), -1)
// 	t.equal(indexOfSorted([], undefined), -1)
// 	t.equal(indexOfSorted([ 1 ], 1), 0)
// 	t.equal(indexOfSorted([ 1 ], 2), -1)
// 	t.equal(indexOfSorted([ 1, 2, 3 ], 1), 0)
// 	t.equal(indexOfSorted([ 1, 2, 3 ], 2), 1)
// 	t.equal(indexOfSorted([ 1, 2, 3 ], 3), 2)
// 	t.equal(indexOfSorted([ 1, 2, 3 ], 0), -1)
// 	t.equal(indexOfSorted([ 1, 2, 3 ], 5), -1)
// })

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

test("array.indexOfBy grouping", (t) => {
	const fn = (x) => Math.floor(x / 10)
	t.equal(indexOfBy([ 1, 12, 15, 23 ], 18, fn), 1)
	t.equal(indexOfByRight([ 1, 12, 15, 23 ], 18, fn), 2)
	t.equal(indexOfBySorted([ 1, 12, 15, 23 ], 18, fn), 1)
	t.equal(indexOfBySortedRight([ 1, 12, 15, 23 ], 18, fn), 2)
	t.equal(indexOfBy([ 1, 23 ], 18, fn), -1)
})

test("array.__indexOf", (t) => {
	const eq = (a, b) => a === b
	const arr = [ 1, 2, 3, 2, 3, 1 ]
	t.equal(__indexOf(arr, 1, 5, 2, eq), 1)
	t.equal(__indexOf(arr, 2, 5, 2, eq), 3)
	t.equal(__indexOf(arr, 1, 5, 3, eq), 2)
	t.equal(__indexOf(arr, 1, 5, 1, eq), -1)
	t.equal(__indexOf(arr, 1, 3, 2, eq), 1)
	t.equal(__indexOf(arr, 2, 3, 3, eq), 2)
	t.equal(__indexOf(arr, 2, 3, 2, eq), -1)
	t.equal(__indexOf(arr, 2, 2, 3, eq), -1)
	t.equal(__indexOf(arr, 1, 5, 2, (y, x) => y === x + 1), 2)
})

test("array.__indexOfRight", (t) => {
	const eq = (a, b) => a === b
	const arr = [ 1, 2, 3, 2, 3, 1 ]
	t.equal(__indexOfRight(arr, 1, 5, 2, eq), 3)
	t.equal(__indexOfRight(arr, 1, 3, 2, eq), 1)
	t.equal(__indexOfRight(arr, 1, 5, 3, eq), 4)
	t.equal(__indexOfRight(arr, 1, 4, 3, eq), 2)
	t.equal(__indexOfRight(arr, 1, 5, 1, eq), -1)
	t.equal(__indexOfRight(arr, 2, 3, 3, eq), 2)
	t.equal(__indexOfRight(arr, 2, 3, 2, eq), -1)
	t.equal(__indexOfRight(arr, 2, 2, 3, eq), -1)
	t.equal(__indexOfRight(arr, 1, 5, 2, (y, x) => y === x + 1), 4)
})

const cmp = (a, b) => a - b
const bigSorted = Array.from({ length: 12000 }, (_, i) => Math.floor(i / 2))

test("array.__indexOfSorted", (t) => {
	const arr = [ 1, 2, 2, 3, 3, 5, 5 ]
	t.equal(__indexOfSorted(arr, 1, 5, 2, cmp), 1)
	t.equal(__indexOfSorted(arr, 2, 5, 2, cmp), 2)
	t.equal(__indexOfSorted(arr, 1, 5, 3, cmp), 3)
	t.equal(__indexOfSorted(arr, 1, 5, 1, cmp), -1)
	t.equal(__indexOfSorted(arr, 1, 5, 5, cmp), -1)
	t.equal(__indexOfSorted(arr, 1, 5, 4, cmp), -1)
	t.equal(__indexOfSorted(arr, 3, 4, 3, cmp), 3)
	t.equal(__indexOfSorted(arr, 3, 4, 2, cmp), -1)
	t.equal(__indexOfSorted(arr, 3, 3, 3, cmp), -1)
	t.equal(__indexOfSorted([ 10, 21, 22, 30 ], 1, 4, 20, (x, y) => Math.floor(x / 10) - Math.floor(y / 10)), 1)

	t.equal(__indexOfSorted(bigSorted, 1001, 11001, 500, cmp), 1001)
	t.equal(__indexOfSorted(bigSorted, 1001, 11001, 600, cmp), 1200)
	t.equal(__indexOfSorted(bigSorted, 1001, 11001, 5500, cmp), 11000)
	t.equal(__indexOfSorted(bigSorted, 1001, 11001, 400, cmp), -1)
	t.equal(__indexOfSorted(bigSorted, 1001, 11001, 5600, cmp), -1)
	t.equal(__indexOfSorted(bigSorted, 1001, 11001, 600.5, cmp), -1)
	t.equal(__indexOfSorted(bigSorted, 1001, 11001, -1, cmp), -1)
	t.equal(__indexOfSorted(bigSorted, 1001, 11001, 7000, cmp), -1)
})

test("array.__indexOfSortedRight", (t) => {
	const arr = [ 1, 2, 2, 3, 3, 5, 5 ]
	t.equal(__indexOfSortedRight(arr, 1, 5, 2, cmp), 2)
	t.equal(__indexOfSortedRight(arr, 1, 2, 2, cmp), 1)
	t.equal(__indexOfSortedRight(arr, 1, 5, 3, cmp), 4)
	t.equal(__indexOfSortedRight(arr, 1, 4, 3, cmp), 3)
	t.equal(__indexOfSortedRight(arr, 1, 5, 1, cmp), -1)
	t.equal(__indexOfSortedRight(arr, 1, 5, 5, cmp), -1)
	t.equal(__indexOfSortedRight(arr, 1, 5, 4, cmp), -1)
	t.equal(__indexOfSortedRight(arr, 3, 4, 2, cmp), -1)
	t.equal(__indexOfSortedRight(arr, 3, 3, 3, cmp), -1)
	t.equal(__indexOfSortedRight([ 10, 21, 22, 30 ], 0, 3, 20, (x, y) => Math.floor(x / 10) - Math.floor(y / 10)), 2)

	t.equal(__indexOfSortedRight(bigSorted, 1001, 11001, 500, cmp), 1001)
	t.equal(__indexOfSortedRight(bigSorted, 1001, 11001, 600, cmp), 1201)
	t.equal(__indexOfSortedRight(bigSorted, 1001, 11001, 5500, cmp), 11000)
	t.equal(__indexOfSortedRight(bigSorted, 1001, 11001, 400, cmp), -1)
	t.equal(__indexOfSortedRight(bigSorted, 1001, 11001, 5600, cmp), -1)
	t.equal(__indexOfSortedRight(bigSorted, 1001, 11001, 600.5, cmp), -1)
	t.equal(__indexOfSortedRight(bigSorted, 1001, 11001, -1, cmp), -1)
	t.equal(__indexOfSortedRight(bigSorted, 1001, 11001, 7000, cmp), -1)
})
