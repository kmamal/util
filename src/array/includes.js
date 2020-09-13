const { __indexOf, __indexOfSorted } = require('./index-of')
const { eq } = require('../operators')
const { compare } = require('../function/compare')
const { identity } = require('../function/identity')

const __includes = (arr, start, end, value, fn) => {
	const index = __indexOf(arr, start, end, value, fn)
	return index !== -1
}

const __includesSorted = (arr, start, end, value, fn) => {
	const index = __indexOfSorted(arr, start, end, value, fn)
	return index !== -1
}

const includesWith = (arr, value, fn) => __includes(arr, 0, arr.length, value, fn)

const includesBy = (arr, value, fn) => includesWith(arr, value, (a, b) => eq(fn(a), fn(b)))

const includes = (arr, value) => includesBy(arr, value, identity)

const includesWithSorted = (arr, value, fn) => __includesSorted(arr, 0, arr.length, value, fn)

const includesBySorted = (arr, value, fn) => includesWithSorted(arr, value, (a, b) => compare(fn(a), fn(b)))

const includesSorted = (arr, value) => includesBySorted(arr, value, identity)

module.exports = {
	__includes,
	__includesSorted,
	includesWith,
	includesBy,
	includes,
	includesWithSorted,
	includesBySorted,
	includesSorted,
}
