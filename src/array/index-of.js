const { __find, __findRight } = require('./find')
const { __bisectLeft, __bisectRight } = require('./bisect')
const { eq } = require('../operators')
const { compare } = require('../function/compare')

const __indexOf = (arr, start, end, x, fn) => __find(arr, start, end, (y) => fn(x, y))

const __indexOfRight = (arr, start, end, x, fn) => __findRight(arr, start, end, (y) => fn(x, y))

const __indexOfSorted = (arr, start, end, x, fn) => {
	if (end - start === 0) { return -1 }
	const index = __bisectLeft(arr, start, end, x, fn)
	const found = index !== end && fn(x, arr[index]) === 0
	return found ? index : -1
}

const __indexOfSortedRight = (arr, start, end, x, fn) => {
	if (end - start === 0) { return -1 }
	const index = __bisectRight(arr, start, end, x, fn) - 1
	const found = index !== start - 1 && fn(x, arr[index]) === 0
	return found ? index : -1
}

const indexOfWith = (arr, x, fn) => __indexOf(arr, 0, arr.length, x, fn)

const indexOfWithRight = (arr, x, fn) => __indexOfRight(arr, 0, arr.length, x, fn)

const indexOfBy = (arr, x, fn) => indexOfWith(arr, x, (a, b) => eq(fn(a), fn(b)))

const indexOfByRight = (arr, x, fn) => indexOfWithRight(arr, x, (a, b) => eq(fn(a), fn(b)))

// HACK: The first argument to eq is always x
const indexOfByPure = (arr, x, fn) => {
	const x_value = fn(x)
	return indexOfWith(arr, x, (a, b) => eq(x_value, fn(b)))
}
const indexOfByPureRight = (arr, x, fn) => {
	const x_value = fn(x)
	return indexOfWithRight(arr, x, (a, b) => eq(x_value, fn(b)))
}

const indexOf = (arr, x) => indexOfWith(arr, x, eq)

const indexOfRight = (arr, x) => indexOfWithRight(arr, x, eq)

const indexOfWithSorted = (arr, x, fn) => __indexOfSorted(arr, 0, arr.length, x, fn)

const indexOfWithSortedRight = (arr, x, fn) => __indexOfSortedRight(arr, 0, arr.length, x, fn)

const indexOfBySorted = (arr, x, fn) => indexOfWithSorted(arr, x, (a, b) => compare(fn(a), fn(b)))

const indexOfBySortedRight = (arr, x, fn) => indexOfWithSortedRight(arr, x, (a, b) => compare(fn(a), fn(b)))

// HACK: The first argument to compare is always x
const indexOfByPureSorted = (arr, x, fn) => {
	const x_value = fn(x)
	return indexOfWithSorted(arr, x, (a, b) => compare(x_value, fn(b)))
}
const indexOfByPureSortedRight = (arr, x, fn) => {
	const x_value = fn(x)
	return indexOfWithSortedRight(arr, x, (a, b) => compare(x_value, fn(b)))
}

const indexOfSorted = (arr, x) => indexOfWithSorted(arr, x, compare)

const indexOfSortedRight = (arr, x) => indexOfWithSortedRight(arr, x, compare)

module.exports = {
	__indexOf,
	__indexOfRight,
	__indexOfSorted,
	__indexOfSortedRight,
	indexOfWith,
	indexOfWithRight,
	indexOfBy,
	indexOfByRight,
	indexOfByPure,
	indexOfByPureRight,
	indexOf,
	indexOfRight,
	indexOfWithSorted,
	indexOfWithSortedRight,
	indexOfBySorted,
	indexOfBySortedRight,
	indexOfByPureSorted,
	indexOfByPureSortedRight,
	indexOfSorted,
	indexOfSortedRight,
}
