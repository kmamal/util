const { __copy, __copyRight } = require('./copy')

const __rotate = (dst, dst_start, src, src_start, src_end, n) => {
	const length = src_end - src_start
	const split_index = (src_start + length - n) % length
	const join_index = dst_start + length - (split_index - src_start)
	__copy(dst, dst_start, src, split_index, src_end)
	__copy(dst, join_index, src, src_start, split_index)
}

const __rotateInplace = (arr, start, end, n) => {
	const length = end - start
	const split_index = (start + length + n) % length
	const join_index = start + length - (split_index - start)

	const tmp = new Array(n)
	if (split_index <= (start + end) / 2) {
		__copy(tmp, 0, arr, start, split_index)
		__copy(arr, start, arr, split_index, end)
		__copy(arr, join_index, tmp, 0, n)
	} else {
		__copy(tmp, 0, arr, split_index, end)
		__copyRight(arr, join_index, arr, start, split_index)
		__copy(arr, start, tmp, 0, n)
	}
}

const rotate$$$ = (arr, n) => {
	__rotateInplace(arr, 0, arr.length, n)
	return arr
}

const rotate = (arr, n) => {
	const { length } = arr
	const res = new Array(length)
	__rotate(res, 0, arr, 0, length, n)
	return res
}

rotate.$$$ = rotate$$$

module.exports = {
	__rotate,
	__rotateInplace,
	rotate,
}
