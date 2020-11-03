const { __reduce } = require('./reduce')
const { identity } = require('../function/identity')

const __min = (arr, start, end, fn) => {
	let index = -1
	return __reduce(arr, start, end, (a, item) => {
		index++
		const value = fn(item)
		return value < a.value ? { value, index } : a
	}, { value: Infinity, index }).index
}

const minIndexBy = (arr, fn) => __min(arr, 0, arr.length, fn)

const minIndex = (arr) => minIndexBy(arr, identity)

const minBy = (arr, fn) => arr[__min(arr, 0, arr.length, fn)]

const min = (arr) => minBy(arr, identity)

module.exports = {
	__min,
	minIndexBy,
	minIndex,
	minBy,
	min,
}
