const { __indexOf, __indexOfSorted } = require('./index-of')
const { eq } = require('../operators')
const { compare } = require('../function/compare')

const __includes = (arr, start, end, x, fn) => {
	const index = __indexOf(arr, start, end, x, fn)
	return index !== -1
}

const __includesSorted = (arr, start, end, x, fn) => {
	const index = __indexOfSorted(arr, start, end, x, fn)
	return index !== -1
}

const includesWith = (arr, x, fn) => __includes(arr, 0, arr.length, x, fn)

const includesBy = (arr, x, fn) => includesWith(arr, x, (a, b) => eq(fn(a), fn(b)))

// HACK: The first argument to compare is always x
const includesByPure = (arr, x, fn) => {
	const x_value = fn(x)
	return includesWith(arr, x, (a, b) => eq(x_value, fn(b)))
}

const includes = (arr, x) => includesWith(arr, x, eq)

const includesWithSorted = (arr, x, fn) => __includesSorted(arr, 0, arr.length, x, fn)

const includesBySorted = (arr, x, fn) => includesWithSorted(arr, x, (a, b) => compare(fn(a), fn(b)))

const includesByPureSorted = (arr, x, fn) => {
	const x_value = fn(x)
	return includesWithSorted(arr, x, (a, b) => compare(x_value, fn(b)))
}

const includesSorted = (arr, x) => includesWithSorted(arr, x, compare)

module.exports = {
	__includes,
	__includesSorted,
	includesWith,
	includesBy,
	includesByPure,
	includes,
	includesWithSorted,
	includesBySorted,
	includesByPureSorted,
	includesSorted,
}
