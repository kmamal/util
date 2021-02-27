const { __bubbleUp } = require('./bubble-up')
const { compare } = require('../../function/compare')

const __add = (arr, start, end, value, fn_cmp) => {
	arr[end] = value
	__bubbleUp(arr, start, end, fn_cmp)
}

const addWith = (arr, value, fn_cmp) => {
	__add(arr, 0, arr.length, value, fn_cmp)
}

const addBy = (arr, value, fn_map) => addWith(arr, value, (a, b) => compare(fn_map(a), fn_map(b)))

const add = (arr, value) => addWith(arr, value, compare)

module.exports = {
	__add,
	addWith,
	addBy,
	add,
}
