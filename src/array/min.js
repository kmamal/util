const { __reduce } = require('./reduce')
const { identity } = require('../function/identity')

const __min = (arr, start, end, fn_map) => {
	let index = -1
	return __reduce(arr, start, end, (a, item) => {
		index++
		const value = fn_map(item)
		return value < a.value ? { value, index } : a
	}, { value: Infinity, index })
}

const minIndexBy = (arr, fn_map) => __min(arr, 0, arr.length, fn_map).index

const minIndex = (arr) => minIndexBy(arr, identity)

const minBy = (arr, fn_map) => arr[minIndexBy(arr, fn_map)]

const min = (arr) => minBy(arr, identity)

module.exports = {
	__min,
	minIndexBy,
	minIndex,
	minBy,
	min,
}
