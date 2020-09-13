const { startIndex } = require('./start-index')
const { endIndex } = require('./end-index')
const { __copy } = require('./copy')

const __fill = (arr, start, end, value) => {
	for (let i = start; i < end; i++) {
		arr[i] = value
	}
}

const fill$$$ = (arr, value, _start, _end) => {
	const { length } = arr
	const start = startIndex(length, _start)
	const end = endIndex(length, _end)

	__fill(arr, start, end, value)

	return arr
}

const fill = (arr, value, _start, _end) => {
	const { length } = arr
	const start = startIndex(length, _start)
	const end = endIndex(length, _end)

	const res = Array(length)
	__copy(res, 0, arr, 0, start)
	__fill(res, start, end, value)
	__copy(res, end, arr, end, length)

	return res
}

fill.$$$ = fill$$$

module.exports = {
	__fill,
	fill,
}
