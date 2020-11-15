
const __interpose = (dst, dst_start, src, src_start, src_end, value) => {
	const length = src_end - src_start
	if (length === 0) { return }

	let write_index = dst_start
	let read_index = src_start

	dst[write_index++] = src[read_index++]

	while (read_index < src_end) {
		dst[write_index++] = value
		dst[write_index++] = src[read_index++]
	}
}

const interpose = (arr, value) => {
	const { length } = arr

	if (length === 0) { return [] }

	const res = new Array(length * 2 - 1)
	__interpose(res, 0, arr, 0, length, value)
	return res
}

module.exports = {
	__interpose,
	interpose,
}
