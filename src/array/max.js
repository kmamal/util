const { __reduce } = require('./reduce')
const { identity } = require('../function/identity')

const __max = (arr, start, end, fn) => {
	let index = -1
	return __reduce(arr, start, end, (a, item) => {
		index++
		const value = fn(item)
		return value > a.value ? { value, index } : a
	}, { value: -Infinity, index }).index
}

const maxIndexBy = (arr, fn) => __max(arr, 0, arr.length, fn)

const maxIndex = (arr) => maxIndexBy(arr, identity)

const maxBy = (arr, fn) => arr[__max(arr, 0, arr.length, fn)]

const max = (arr) => maxBy(arr, identity)

module.exports = {
	__max,
	maxIndexBy,
	maxIndex,
	maxBy,
	max,
}
