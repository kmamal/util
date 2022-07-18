const { __reduce } = require('./reduce')
const { identity } = require('../function/identity')

const __max = (arr, start, end, fnMap) => {
	let index = -1
	return __reduce(arr, start, end, (a, item) => {
		index++
		const value = fnMap(item)
		return value > a.value ? { value, index } : a
	}, { value: -Infinity, index })
}

const maxIndexBy = (arr, fnMap) => __max(arr, 0, arr.length, fnMap).index

const maxIndex = (arr) => maxIndexBy(arr, identity)

const maxBy = (arr, fnMap) => arr[maxIndexBy(arr, fnMap)]

const max = (arr) => maxBy(arr, identity)

module.exports = {
	__max,
	maxIndexBy,
	maxIndex,
	maxBy,
	max,
}
