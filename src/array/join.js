
const __join = (dst, dst_start, a, a_start, a_end, b, b_start, b_end) => {
	let write_index = dst_start
	let a_index = a_start

	if (a_index === a_end) { return }
	{
		const a_item = a[a_index++]
		dst[write_index++] = a_item
	}

	while (a_index < a_end) {
		let b_index = b_start
		while (b_index < b_end) {
			const b_item = b[b_index++]
			dst[write_index++] = b_item
		}
		const a_item = a[a_index++]
		dst[write_index++] = a_item
	}
}

const join = (arr, sep) => {
	const { length: arr_len } = arr
	const { length: sep_len } = sep
	const res_len = Math.max(0, arr_len + (arr_len - 1) * sep_len)
	const res = new Array(res_len)
	__join(res, 0, arr, 0, arr_len, sep, 0, sep_len)
	return res
}

module.exports = { join }
