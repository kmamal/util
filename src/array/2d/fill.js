const { Array2d } = require('./class')
const { startPoint } = require('./start-point')
const { endPoint } = require('./end-point')
const { startIndex: getStartIndex } = require('./start-index')
const { endIndex: getEndIndex } = require('./end-index')
const { __copy } = require('./copy')

const __fill = (arr, stride, start, end, width, value) => {
	let writeIndex = start
	const step = stride - width
	while (writeIndex < end) {
		for (let i = 0; i < width; i++) {
			arr[writeIndex++] = value
		}
		writeIndex += step
	}
}

const fill$$$ = (arr, value, _start, _end) => {
	const { w, h } = arr
	const start = startPoint(w, h, _start)
	const end = endPoint(w, h, _end)
	const startIndex = getStartIndex(w, start)
	const endIndex = getEndIndex(w, end)

	const width = end[0] - start[0]
	__fill(arr.data, w, startIndex, endIndex, width, value)
	return arr
}

const fill = (arr, value, _start, _end) => {
	const { w, h } = arr
	const start = startPoint(w, h, _start)
	const end = endPoint(w, h, _end)
	const startIndex = getStartIndex(w, start)
	const endIndex = getEndIndex(w, end)

	const res = new Array2d(w, h)
	const width = end[0] - start[0]
	const width_left = start[0]
	const width_right = w - end[0]
	const height_above = start[1]
	const height_below = h - end[1]

	// ........
	// ........
	// P..SXQ..
	// ...XX...
	// R....E..
	// ........

	const p_index = getStartIndex(w, [ 0, start[1] ])
	const q_index = getStartIndex(w, [ end[0], start[1] ])
	const r_index = getStartIndex(w, [ 0, end[1] ])

	height_above && __copy(res.data, w, 0, arr.data, w, 0, p_index, w)
	width_left && __copy(res.data, w, p_index, arr.data, w, p_index, r_index, width_left)
	__fill(res.data, w, startIndex, endIndex, width, value)
	width_right && __copy(res.data, w, q_index, arr.data, w, q_index, r_index, width_right)
	height_below && __copy(res.data, w, r_index, arr.data, w, r_index, w * h, w)

	return res
}

fill.$$$ = fill$$$

module.exports = {
	__fill,
	fill,
}
