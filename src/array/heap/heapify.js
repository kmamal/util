const { __bubbleDown } = require('./bubble-down')
const { getParent } = require('../tree/binary')
const { compare } = require('../../function/compare')

const __heapify = (arr, start, end, fn) => {
	const first = start + getParent((end - start) - 1)
	for (let i = first; i >= start; i--) {
		__bubbleDown(arr, start, end, i, fn)
	}
}

const heapifyWith = (arr, fn) => {
	__heapify(arr, 0, arr.length, fn)
}

const heapifyBy = (arr, fn) => heapifyWith(arr, (a, b) => compare(fn(a), fn(b)))

const heapify = (arr) => heapifyWith(arr, compare)

module.exports = {
	__heapify,
	heapifyWith,
	heapifyBy,
	heapify,
}
