
const __scan = (dst, dst_start, src, src_start, src_end, fn, init) => {
	if (src_start === src_end) { return }

	let write_index = dst_start
	let read_index = src_start

	let acc = init

	const first = src[read_index++]
	if (acc === undefined) {
		acc = first
	} else {
		acc = fn(acc, first)
	}
	dst[write_index++] = acc

	while (read_index < src_end) {
		acc = fn(acc, src[read_index++])
		dst[write_index++] = acc
	}
}
const __scanRight = (dst, dst_start, src, src_start, src_end, fn, init) => {
	if (src_start === src_end) { return }

	const length = src_end - src_start
	const dst_end = dst_start + length
	let write_index = dst_end - 1
	let read_index = src_end - 1

	let acc = init

	const last = src[read_index--]
	if (acc === undefined) {
		acc = last
	} else {
		acc = fn(acc, last)
	}
	dst[write_index--] = acc

	while (read_index >= src_start) {
		acc = fn(acc, src[read_index--])
		dst[write_index--] = acc
	}
}

const scan$$$ = (arr, fn, init) => {
	__scan(arr, 0, arr, 0, arr.length, fn, init)
	return arr
}

const scan = (arr, fn, init) => {
	const { length } = arr
	const res = Array(length)
	__scan(res, 0, arr, 0, length, fn, init)
	return res
}

scan.$$$ = scan$$$

const scanRight$$$ = (arr, fn, init) => {
	__scanRight(arr, 0, arr, 0, arr.length, fn, init)
	return arr
}

const scanRight = (arr, fn, init) => {
	const { length } = arr
	const res = Array(length)
	__scanRight(res, 0, arr, 0, length, fn, init)
	return res
}

scanRight.$$$ = scanRight$$$

module.exports = {
	__scan,
	__scanRight,
	scan,
	scanRight,
}
