const { __bubbleDown } = require('./bubble-down')

const __pop = (arr, start, end, fn) => {
	const top = arr[start]
	const last_index = end - 1
	arr[start] = arr[last_index]
	arr[last_index] = top
	__bubbleDown(arr, start, last_index, start, fn)
}

module.exports = { __pop }
