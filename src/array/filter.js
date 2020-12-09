
const __filter = (dst, dst_start, src, src_start, src_end, fn_pred) => {
	let write_index = dst_start
	let read_index = src_start
	while (read_index < src_end) {
		const item = src[read_index++]
		const keep = fn_pred(item)
		if (!keep) { continue }
		dst[write_index++] = item
	}
	return write_index - dst_start
}

const filter$$$ = (arr, fn_pred) => {
	const n = __filter(arr, 0, arr, 0, arr.length, fn_pred)
	arr.length = n
	return arr
}

const filter = (arr, fn_pred) => {
	const res = []
	__filter(res, 0, arr, 0, arr.length, fn_pred)
	return res
}

filter.$$$ = filter$$$

module.exports = {
	__filter,
	filter,
}
