
const __map = (dst, dst_start, src, src_start, src_end, fn) => {
	let write_index = dst_start
	let read_index = src_start
	while (read_index < src_end) {
		dst[write_index++] = fn(src[read_index++])
	}
}

const map$$$ = (arr, fn) => {
	__map(arr, 0, arr, 0, arr.length, fn)
	return arr
}

const map = (arr, fn) => {
	const { length } = arr
	const res = new Array(length)
	__map(res, 0, arr, 0, arr.length, fn)
	return res
}

map.$$$ = map$$$

module.exports = {
	__map,
	map,
}
