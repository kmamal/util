
const __cycle = (dst, dst_start, src, src_start, src_end, n) => {
	const length = src_end - src_start
	if (length === 0) { return 0 }

	const remainder = n % length
	const full_loops = (n - remainder) / length

	let write_index = dst_start
	let read_index

	for (let i = 0; i < full_loops; i++) {
		read_index = src_start
		while (read_index < src_end) {
			dst[write_index++] = src[read_index++]
		}
	}

	read_index = src_start
	while (read_index < src_start + remainder) {
		dst[write_index++] = src[read_index++]
	}
}

const cycle$$$ = (arr, n) => {
	const { length } = arr

	if (length === 0) {
		arr.length = 0
		return arr
	}

	arr.length = n
	__cycle(arr, length, arr, 0, length, n - length)
	return arr
}

const cycle = (arr, n) => {
	const { length } = arr

	if (length === 0) {
		arr.length = 0
		return arr
	}

	const res = Array(n)
	__cycle(res, 0, arr, 0, arr.length, n)
	return res
}

cycle.$$$ = cycle$$$

module.exports = {
	__cycle,
	cycle,
}
