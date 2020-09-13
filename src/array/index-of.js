const { __find, __findRight } = require('./find')
const { __bisectLeft, __bisectRight } = require('./bisect')
const { eq } = require('../operators')
const { compare } = require('../function/compare')
const { identity } = require('../function/identity')

const __indexOf = (arr, start, end, value, fn) => __find(arr, start, end, (x) => fn(x, value))

const __indexOfRight = (arr, start, end, value, fn) => __findRight(arr, start, end, (x) => fn(x, value))

const __indexOfSorted = (arr, start, end, value, fn) => {
	if (end - start === 0) { return -1 }
	const index = __bisectLeft(arr, start, end, value, fn)
	const found = index !== end && fn(arr[index], value) === 0
	return found ? index : -1
}

const __indexOfSortedRight = (arr, start, end, value, fn) => {
	if (end - start === 0) { return -1 }
	const index = __bisectRight(arr, start, end, value, fn) - 1
	const found = index !== start - 1 && fn(arr[index], value) === 0
	return found ? index : -1
}

const indexOfWith = (arr, value, fn) => __indexOf(arr, 0, arr.length, value, fn)

const indexOfBy = (arr, value, fn) => indexOfWith(arr, value, (a, b) => eq(fn(a), fn(b)))

const indexOf = (arr, value) => indexOfBy(arr, value, identity)

const indexOfWithRight = (arr, value, fn) => __indexOfRight(arr, 0, arr.length, value, fn)

const indexOfByRight = (arr, value, fn) => indexOfWithRight(arr, value, (a, b) => eq(fn(a), fn(b)))

const indexOfRight = (arr, value) => indexOfByRight(arr, value, identity)

const indexOfWithSorted = (arr, value, fn) => __indexOfSorted(arr, 0, arr.length, value, fn)

const indexOfBySorted = (arr, value, fn) => indexOfWithSorted(arr, value, (a, b) => compare(fn(a), fn(b)))

const indexOfSorted = (arr, value) => indexOfBySorted(arr, value, identity)

const indexOfWithSortedRight = (arr, value, fn) => __indexOfSortedRight(arr, 0, arr.length, value, fn)

const indexOfBySortedRight = (arr, value, fn) => indexOfWithSortedRight(arr, value, (a, b) => compare(fn(a), fn(b)))

const indexOfSortedRight = (arr, value) => indexOfBySortedRight(arr, value, identity)

module.exports = {
	__indexOf,
	__indexOfRight,
	__indexOfSorted,
	__indexOfSortedRight,
	indexOfWith,
	indexOfBy,
	indexOf,
	indexOfWithRight,
	indexOfByRight,
	indexOfRight,
	indexOfWithSorted,
	indexOfBySorted,
	indexOfSorted,
	indexOfWithSortedRight,
	indexOfBySortedRight,
	indexOfSortedRight,
}
