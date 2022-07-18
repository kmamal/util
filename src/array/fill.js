const { startIndex } = require('./start-index')
const { endIndex } = require('./end-index')
const { __copy } = require('./copy')

const __fill = (arr, start, end, value) => {
	for (let i = start; i < end; i++) {
		arr[i] = value
	}
}

const __fillWith = (arr, start, end, fn) => {
	for (let i = start; i < end; i++) {
		arr[i] = fn(i)
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

	const res = new Array(length)
	__copy(res, 0, arr, 0, start)
	__fill(res, start, end, value)
	__copy(res, end, arr, end, length)

	return res
}

fill.$$$ = fill$$$

const fillWith$$$ = (arr, fn, _start, _end) => {
	const { length } = arr
	const start = startIndex(length, _start)
	const end = endIndex(length, _end)

	__fillWith(arr, start, end, fn)

	return arr
}

const fillWith = (arr, fn, _start, _end) => {
	const { length } = arr
	const start = startIndex(length, _start)
	const end = endIndex(length, _end)

	const res = new Array(length)
	__copy(res, 0, arr, 0, start)
	__fillWith(res, start, end, fn)
	__copy(res, end, arr, end, length)

	return res
}

fillWith.$$$ = fillWith$$$

module.exports = {
	__fill,
	__fillWith,
	fill,
	fillWith,
}
