
const __compactMap = (dst, dst_start, src, src_start, src_end, fn_map) => {
	let write_index = dst_start
	let read_index = src_start
	while (read_index < src_end) {
		const item = src[read_index++]
		const mapped = fn_map(item)
		if (!mapped) { continue }
		dst[write_index++] = mapped
	}
	return write_index - dst_start
}

const compactMap$$$ = (arr, fn_map) => {
	const n = __compactMap(arr, 0, arr, 0, arr.length, fn_map)
	arr.length = n
	return arr
}

const compactMap = (arr, fn_map) => {
	const res = []
	__compactMap(res, 0, arr, 0, arr.length, fn_map)
	return res
}

compactMap.$$$ = compactMap$$$

module.exports = {
	__compactMap,
	compactMap,
}
