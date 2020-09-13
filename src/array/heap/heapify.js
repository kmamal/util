const { __bubbleDown } = require('./bubble-down')
const { getParent } = require('../tree/binary')

const __heapify = (arr, start, end, fn) => {
	const first = start + getParent((end - start) - 1)
	for (let i = first; i >= start; i--) {
		__bubbleDown(arr, start, end, i, fn)
	}
}

module.exports = { __heapify }
