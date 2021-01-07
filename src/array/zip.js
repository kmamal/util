const { reduce } = require('./reduce')
const { identity } = require('../function/identity')

const __zip = (dst, dst_start, src, src_start, src_end, inner_start, inner_end, fn_map) => {
	const length = src_end - src_start
	let write_index = dst_start
	let inner_index = inner_start
	while (inner_index < inner_end) {
		const tuple = new Array(length)
		for (let i = 0; i < length; i++) {
			tuple[i] = src[i][inner_index]
		}
		dst[write_index++] = fn_map(tuple)
		inner_index += 1
	}
	return write_index - dst_start
}

const zipWith = (arr, fn_map) => {
	const width = reduce(arr, (max, { length }) => Math.max(max, length), 0)
	const res = new Array(width)
	__zip(res, 0, arr, 0, arr.length, 0, width, fn_map)
	return res
}

const zip = (arr) => zipWith(arr, identity)

module.exports = {
	__zip,
	zipWith,
	zip,
}
