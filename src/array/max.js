const { __reduce } = require('./reduce')
const { identity } = require('../function/identity')

const __max = (arr, start, end, fn_map) => {
	let index = -1
	return __reduce(arr, start, end, (a, item) => {
		index++
		const value = fn_map(item)
		return value > a.value ? { value, index } : a
	}, { value: -Infinity, index })
}

const maxIndexBy = (arr, fn_map) => __max(arr, 0, arr.length, fn_map).index

const maxIndex = (arr) => maxIndexBy(arr, identity)

const maxBy = (arr, fn_map) => arr[maxIndexBy(arr, fn_map)]

const max = (arr) => maxBy(arr, identity)

module.exports = {
	__max,
	maxIndexBy,
	maxIndex,
	maxBy,
	max,
}
