const { __reduce } = require('./reduce')

const __zip = (dst, dst_start, src, src_start, src_end, inner_start, inner_end) => {
	const length = src_end - src_start
	let write_index = dst_start
	let inner_index = inner_start
	while (inner_index < inner_end) {
		const tuple = Array(length)
		for (let i = 0; i < length; i++) {
			tuple[i] = src[i][inner_index]
		}
		dst[write_index++] = tuple
		inner_index += 1
	}
	return write_index - dst_start
}

const _calcWidth = (arr) => __reduce(arr, 0, arr.length, (a, x) => Math.max(a, x.length), 0)

const zip = (arr) => {
	const width = _calcWidth(arr)
	const res = Array(width)
	__zip(res, 0, arr, 0, arr.length, 0, width)
	return res
}

module.exports = {
	__zip,
	zip,
}
