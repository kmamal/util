const { __bubbleDown } = require('./bubble-down')
const { compare } = require('../../function/compare')

const __pop = (arr, start, end, fn) => {
	const top = arr[start]
	const last_index = end - 1
	arr[start] = arr[last_index]
	arr[last_index] = top
	__bubbleDown(arr, start, last_index, start, fn)
}

const popWith = (arr, fn) => {
	__pop(arr, 0, arr.length, fn)
	return arr.pop()
}

const popBy = (arr, fn) => popWith(arr, (a, b) => compare(fn(a), fn(b)))

const pop = (arr) => popWith(arr, compare)

module.exports = {
	__pop,
	popWith,
	popBy,
	pop,
}
