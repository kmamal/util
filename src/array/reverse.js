
const __reverse = (dst, dst_start, src, src_start, src_end) => {
	const offset = (src_end - src_start) - 1
	let write_index_start = dst_start
	let write_index_end = dst_start + offset
	let read_index_start = src_start
	let read_index_end = src_start + offset
	while (read_index_start < read_index_end) {
		const front = src[read_index_start++]
		const back = src[read_index_end--]
		dst[write_index_start++] = back
		dst[write_index_end--] = front
	}

	if (read_index_start === read_index_end) {
		dst[write_index_start] = src[read_index_start]
	}
}

const reverse$$$ = (arr) => {
	__reverse(arr, 0, arr, 0, arr.length)
	return arr
}

const reverse = (arr) => {
	const { length } = arr
	const res = Array(length)
	__reverse(res, 0, arr, 0, length)
	return res
}

reverse.$$$ = reverse$$$

module.exports = {
	__reverse,
	reverse,
}
