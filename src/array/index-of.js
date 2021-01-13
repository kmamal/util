const { __linearSearch, __linearSearchRight } = require('./search/linear')
const { __binarySearchLeft, __binarySearchRight } = require('./search/binary')
const { eq } = require('../operators')
const { compare } = require('../function/compare')

const LINEAR_SEARCH_CUTOFF = 8

const __indexOf = (arr, start, end, x, fn_eq) => __linearSearch(arr, start, end, (y) => fn_eq(x, y))

const __indexOfRight = (arr, start, end, x, fn_eq) => __linearSearchRight(arr, start, end, (y) => fn_eq(x, y))

const __indexOfSorted = (arr, start, end, x, fn_cmp) => {
	const length = end - start
	if (length === 0) { return -1 }
	if (length <= LINEAR_SEARCH_CUTOFF) {
		return __indexOf(arr, start, end, x, (a, b) => fn_cmp(a, b) === 0)
	}
	const index = __binarySearchLeft(arr, start, end, x, fn_cmp)
	const found = index !== end && fn_cmp(x, arr[index]) === 0
	return found ? index : -1
}

const __indexOfSortedRight = (arr, start, end, x, fn_cmp) => {
	const length = end - start
	if (length === 0) { return -1 }
	if (length <= LINEAR_SEARCH_CUTOFF) {
		return __indexOfRight(arr, start, end, x, (a, b) => fn_cmp(a, b) === 0)
	}
	const index = __binarySearchRight(arr, start, end, x, fn_cmp) - 1
	const found = index !== start - 1 && fn_cmp(x, arr[index]) === 0
	return found ? index : -1
}

const indexOfWith = (arr, x, fn_eq) => __indexOf(arr, 0, arr.length, x, fn_eq)

const indexOfWithRight = (arr, x, fn_eq) => __indexOfRight(arr, 0, arr.length, x, fn_eq)

const indexOfBy = (arr, x, fn_map) => indexOfWith(arr, x, (a, b) => eq(fn_map(a), fn_map(b)))

const indexOfByRight = (arr, x, fn_map) => indexOfWithRight(arr, x, (a, b) => eq(fn_map(a), fn_map(b)))

// HACK: The first argument to eq is always x
const indexOfByPure = (arr, x, fn_map) => {
	const x_value = fn_map(x)
	return indexOfWith(arr, x, (a, b) => eq(x_value, fn_map(b)))
}
const indexOfByPureRight = (arr, x, fn_map) => {
	const x_value = fn_map(x)
	return indexOfWithRight(arr, x, (a, b) => eq(x_value, fn_map(b)))
}

const indexOf = (arr, x) => indexOfWith(arr, x, eq)

const indexOfRight = (arr, x) => indexOfWithRight(arr, x, eq)

const indexOfWithSorted = (arr, x, fn_cmp) => __indexOfSorted(arr, 0, arr.length, x, fn_cmp)

const indexOfWithSortedRight = (arr, x, fn_cmp) => __indexOfSortedRight(arr, 0, arr.length, x, fn_cmp)

const indexOfBySorted = (arr, x, fn_map) => indexOfWithSorted(arr, x, (a, b) => compare(fn_map(a), fn_map(b)))

const indexOfBySortedRight = (arr, x, fn_map) => indexOfWithSortedRight(arr, x, (a, b) => compare(fn_map(a), fn_map(b)))

// HACK: The first argument to compare is always x
const indexOfByPureSorted = (arr, x, fn_map) => {
	const x_value = fn_map(x)
	return indexOfWithSorted(arr, x, (a, b) => compare(x_value, fn_map(b)))
}
const indexOfByPureSortedRight = (arr, x, fn_map) => {
	const x_value = fn_map(x)
	return indexOfWithSortedRight(arr, x, (a, b) => compare(x_value, fn_map(b)))
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
