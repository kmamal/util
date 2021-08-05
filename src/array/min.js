const { __reduce } = require('./reduce')
const { identity } = require('../function/identity')

const __min = (arr, start, end, fnMap) => {
	let index = -1
	return __reduce(arr, start, end, (a, item) => {
		index++
		const value = fnMap(item)
		return value < a.value ? { value, index } : a
	}, { value: Infinity, index })
}

const minIndexBy = (arr, fnMap) => __min(arr, 0, arr.length, fnMap).index

const minIndex = (arr) => minIndexBy(arr, identity)

const minBy = (arr, fnMap) => arr[minIndexBy(arr, fnMap)]

const min = (arr) => minBy(arr, identity)

module.exports = {
	__min,
	minIndexBy,
	minIndex,
	minBy,
	min,
}
