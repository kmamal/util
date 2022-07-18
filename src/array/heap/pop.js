const { __bubbleDown } = require('./bubble-down')
const { compare } = require('../../function/compare')

const __pop = (arr, start, end, fn) => {
	const top = arr[start]
	const lastIndex = end - 1
	arr[start] = arr[lastIndex]
	arr[lastIndex] = top
	__bubbleDown(arr, start, lastIndex, start, fn)
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
