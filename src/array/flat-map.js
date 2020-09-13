
const __flatMap = (dst, dst_start, src, src_start, src_end, fn) => {
	let write_index = dst_start
	let read_index = src_start
	while (read_index < src_end) {
		const item = src[read_index++]
		const mapped = fn(item)
		for (let i = 0; i < mapped.length; i++) {
			dst[write_index++] = mapped[i]
		}
	}
	return write_index - dst_start
}

const flatMap = (arr, fn) => {
	const res = []
	__flatMap(res, 0, arr, 0, arr.length, fn)
	return res
}

module.exports = {
	__flatMap,
	flatMap,
}
