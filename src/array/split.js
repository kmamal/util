
const __split = (dst, dst_start, src, src_start, src_end, fn_pred) => {
	let write_index = dst_start
	let chunk = []
	let read_index = src_start
	while (read_index < src_end) {
		const item = src[read_index++]
		if (fn_pred(item)) {
			dst[write_index++] = chunk
			chunk = []
			continue
		}
		chunk.push(item)
	}
	dst[write_index++] = chunk

	return write_index
}

const splitWith = (arr, fn_pred) => {
	const res = []
	__split(res, 0, arr, 0, arr.length, fn_pred)
	return res
}

const splitBy = (arr, value, fn_map) => {
	const fn_pred = (x) => fn_map(x) === value
	return splitWith(arr, fn_pred)
}

const split = (arr, value) => splitWith(arr, (x) => x === value)

module.exports = {
	__split,
	splitWith,
	splitBy,
	split,
}
