
const __chunk = (dst, dst_start, src, src_start, src_end, chunk_size, chunk_num) => {
	let write_index = dst_start
	let read_index = src_start
	const dst_end = dst_start + chunk_num

	while (write_index < dst_end - 1) {
		const chunk = Array(chunk_size)
		for (let i = 0; i < chunk_size; i++) {
			chunk[i] = src[read_index++]
		}
		dst[write_index++] = chunk
	}

	if (write_index < dst_end) {
		const available = Math.max(0, src_end - read_index)
		const last_chunk_size = Math.min(available, chunk_size)
		const chunk = Array(last_chunk_size)
		for (let i = 0; i < last_chunk_size; i++) {
			chunk[i] = src[read_index++]
		}
		dst[write_index++] = chunk
	}

	return write_index - dst_start
}

const chunk$$$ = (arr, n) => {
	const { length } = arr
	const num_chunks = Math.ceil(length / n)
	__chunk(arr, 0, arr, 0, length, n, num_chunks)
	arr.length = num_chunks
	return arr
}

const chunk = (arr, n) => {
	const { length } = arr
	const num_chunks = Math.ceil(length / n)
	const res = Array(num_chunks)
	__chunk(res, 0, arr, 0, length, n, num_chunks)
	return res
}

chunk.$$$ = chunk$$$

module.exports = {
	__chunk,
	chunk,
}
