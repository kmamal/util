const { Array2d } = require('./class')
const { startPoint } = require('./start-point')
const { endPoint } = require('./end-point')
const { startIndex: getStartIndex } = require('./start-index')
const { endIndex: getEndIndex } = require('./end-index')

const __copy = (dst, dst_stride, dstStart, src, src_stride, srcStart, srcEnd, src_width) => {
	let writeIndex = dstStart
	let readIndex = srcStart
	const dst_step = dst_stride - src_width
	const src_step = src_stride - src_width
	while (readIndex < srcEnd) {
		for (let i = 0; i < src_width; i++) {
			dst[writeIndex++] = src[readIndex++]
		}
		writeIndex += dst_step
		readIndex += src_step
	}
}

const copy$$$ = (a, _offset, b, _start, _end) => {
	const { w: aw, h: ah } = a
	const { w: bw, h: bh } = b
	const offset = startPoint(aw, ah, _offset)
	const start = startPoint(bw, bh, _start)
	const end = endPoint(bw, bh, _end)
	const offset_index = getStartIndex(aw, offset)
	const startIndex = getStartIndex(bw, start)
	const endIndex = getEndIndex(bw, end)
	const width = end[0] - start[0]
	__copy(a.data, aw, offset_index, b.data, bw, startIndex, endIndex, width)
	return a
}

const copy = (a, _offset, b, _start, _end) => {
	const { w: aw, h: ah } = a
	const { w: bw, h: bh } = b
	const offset = startPoint(aw, ah, _offset)
	const start = startPoint(bw, bh, _start)
	const end = endPoint(bw, bh, _end)
	const offset_index = getStartIndex(aw, offset)
	const startIndex = getStartIndex(bw, start)
	const endIndex = getEndIndex(bw, end)

	const res = new Array2d(aw, ah)
	const width = end[0] - start[0]
	const height = end[1] - start[1]
	const limit = [ offset[0] + width, offset[1] + height ]
	const height_above = offset[1]
	const height_below = ah - limit[1]
	const width_left = offset[0]
	const width_right = aw - limit[0]

	// ........
	// ........
	// P..S#Q..
	// ...##...
	// R....E..
	// ........

	const p_index = getStartIndex(aw, [ 0, offset[1] ])
	const q_index = getStartIndex(aw, [ limit[0], offset[1] ])
	const r_index = getStartIndex(aw, [ 0, limit[1] ])

	height_above && __copy(res.data, aw, 0, a.data, aw, 0, p_index, aw)
	width_left && __copy(res.data, aw, p_index, a.data, aw, p_index, r_index, width_left)
	__copy(res.data, aw, offset_index, b.data, bw, startIndex, endIndex, width)
	width_right && __copy(res.data, aw, q_index, a.data, aw, q_index, r_index, width_right)
	height_below && __copy(res.data, aw, r_index, a.data, aw, r_index, aw * ah, aw)

	return res
}

copy.$$$ = copy$$$

module.exports = {
	__copy,
	copy,
}
