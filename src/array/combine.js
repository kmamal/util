const { startIndex } = require('./start-index')
const { endIndex } = require('./end-index')
const { __copy } = require('./copy')

const __combine = (dst, dst_start, a, a_start, b, b_start, length, fn) => {
	const dst_end = dst_start + length
	let write_index = dst_start
	let a_index = a_start
	let b_index = b_start
	while (write_index < dst_end) {
		const a_item = a[a_index++]
		const b_item = b[b_index++]
		const combined = fn(a_item, b_item)
		dst[write_index++] = combined
	}
}

const combine$$$ = (a, _offset, fn, b, _start, _end) => {
	const offset = startIndex(a.length, _offset)
	const start = startIndex(b.length, _start)
	const end = endIndex(b.length, _end)
	__combine(a, offset, a, offset, b, start, end - start, fn)
	return a
}

const combine = (a, _offset, fn, b, _start, _end) => {
	const { length: a_length } = a
	const { length: b_length } = b
	const offset = startIndex(a_length, _offset)
	const start = startIndex(b_length, _start)
	const end = endIndex(b_length, _end)
	const length = end - start
	const res = new Array(a_length)
	__copy(res, 0, a, 0, offset)
	__combine(res, offset, a, offset, b, start, length, fn)
	__copy(res, offset + length, a, end, a_length)
	return res
}

combine.$$$ = combine$$$

module.exports = {
	__combine,
	combine,
}
