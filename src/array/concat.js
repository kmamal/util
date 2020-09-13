const { sumBy } = require('./sum')

const __concat = (dst, dst_start, src, src_start, src_end) => {
	let write_index = dst_start
	let read_index = src_start
	while (read_index < src_end) {
		const arr = src[read_index++]
		for (let j = 0; j < arr.length; j++) {
			dst[write_index++] = arr[j]
		}
	}
	return write_index - dst_start
}

const concat = (arrs) => {
	const total = sumBy(arrs, ({ length: n }) => n)
	const res = Array(total)
	__concat(res, 0, arrs, 0, arrs.length)
	return res
}

module.exports = {
	__concat,
	concat,
}
