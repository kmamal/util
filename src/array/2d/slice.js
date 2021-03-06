const { __copy } = require('./copy')
const { Array2d } = require('./class')
const { startPoint } = require('./start-point')
const { endPoint } = require('./end-point')
const { startIndex: getStartIndex } = require('./start-index')
const { endIndex: getEndIndex } = require('./end-index')

const slice$$$ = (arr, _start, _end) => {
	const { w, h } = arr
	const start = startPoint(w, h, _start)
	const end = endPoint(w, h, _end)
	const startIndex = getStartIndex(w, start)
	const endIndex = getEndIndex(w, end)

	const res_w = Math.max(0, end[0] - start[0])
	const res_h = Math.max(0, end[1] - start[1])
	__copy(arr.data, res_w, 0, arr.data, w, startIndex, endIndex, res_w)
	arr.w = res_w
	arr.h = res_h
	arr.data.length = res_w * res_h

	return arr
}

const slice = (arr, _start, _end) => {
	const { w, h } = arr
	const start = startPoint(w, h, _start)
	const end = endPoint(w, h, _end)
	const startIndex = getStartIndex(w, start)
	const endIndex = getEndIndex(w, end)

	const res_w = Math.max(0, end[0] - start[0])
	const res_h = Math.max(0, end[1] - start[1])
	const res = new Array2d(res_w, res_h)
	__copy(res.data, res_w, 0, arr.data, w, startIndex, endIndex, res_w)
	return res
}

slice.$$$ = slice$$$

module.exports = { slice }
