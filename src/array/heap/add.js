const { __bubbleUp } = require('./bubble-up')
const { compare } = require('../../function/compare')

const __add = (arr, start, end, value, fnCmp) => {
	arr[end] = value
	__bubbleUp(arr, start, end, fnCmp)
}

const addWith = (arr, value, fnCmp) => {
	__add(arr, 0, arr.length, value, fnCmp)
}

const addBy = (arr, value, fnMap) => addWith(arr, value, (a, b) => compare(fnMap(a), fnMap(b)))

const add = (arr, value) => addWith(arr, value, compare)

module.exports = {
	__add,
	addWith,
	addBy,
	add,
}
