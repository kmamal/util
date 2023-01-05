const { __linearSearch, __linearSearchRight } = require('./searching/linear')
const { __binarySearchFirst, __binarySearchLast } = require('./searching/binary')
const { eq } = require('../operators')
const { compare } = require('../function/compare')

const LINEAR_SEARCH_CUTOFF = 8

const __indexOf = (arr, start, end, x, fnEq) => __linearSearch(arr, start, end, (y) => fnEq(x, y))

const __indexOfRight = (arr, start, end, x, fnEq) => __linearSearchRight(arr, start, end, (y) => fnEq(x, y))

const __indexOfSorted = (arr, start, end, x, fnCmp) => {
	const length = end - start
	if (length === 0) { return -1 }
	if (length <= LINEAR_SEARCH_CUTOFF) {
		return __indexOf(arr, start, end, x, (a, b) => fnCmp(a, b) === 0)
	}
	const index = __binarySearchFirst(arr, start, end, x, fnCmp)
	const found = index !== end && fnCmp(x, arr[index]) === 0
	return found ? index : -1
}

const __indexOfSortedRight = (arr, start, end, x, fnCmp) => {
	const length = end - start
	if (length === 0) { return -1 }
	if (length <= LINEAR_SEARCH_CUTOFF) {
		return __indexOfRight(arr, start, end, x, (a, b) => fnCmp(a, b) === 0)
	}
	const index = __binarySearchLast(arr, start, end, x, fnCmp) - 1
	const found = index !== start - 1 && fnCmp(x, arr[index]) === 0
	return found ? index : -1
}

const indexOfWith = (arr, x, fnEq) => __indexOf(arr, 0, arr.length, x, fnEq)

const indexOfWithRight = (arr, x, fnEq) => __indexOfRight(arr, 0, arr.length, x, fnEq)

const indexOfBy = (arr, x, fnMap) => {
	// HACK: The first argument to eq is always x
	const xValue = fnMap(x)
	return indexOfWith(arr, x, (a, b) => eq(xValue, fnMap(b)))
}
const indexOfByRight = (arr, x, fnMap) => {
	// HACK: The first argument to eq is always x
	const xValue = fnMap(x)
	return indexOfWithRight(arr, x, (a, b) => eq(xValue, fnMap(b)))
}

const indexOf = (arr, x) => indexOfWith(arr, x, eq)

const indexOfRight = (arr, x) => indexOfWithRight(arr, x, eq)

const indexOfWithSorted = (arr, x, fnCmp) => __indexOfSorted(arr, 0, arr.length, x, fnCmp)

const indexOfWithSortedRight = (arr, x, fnCmp) => __indexOfSortedRight(arr, 0, arr.length, x, fnCmp)

const indexOfBySorted = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return indexOfWithSorted(arr, x, (a, b) => compare(xValue, fnMap(b)))
}
const indexOfBySortedRight = (arr, x, fnMap) => {
	// HACK: The first argument to compare is always x
	const xValue = fnMap(x)
	return indexOfWithSortedRight(arr, x, (a, b) => compare(xValue, fnMap(b)))
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
	indexOf,
	indexOfRight,
	indexOfWithSorted,
	indexOfWithSortedRight,
	indexOfBySorted,
	indexOfBySortedRight,
	indexOfSorted,
	indexOfSortedRight,
}
