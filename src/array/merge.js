const { __copy, __copyRight } = require('./copy')
const { compare } = require('../function/compare')
const { identity } = require('../function/identity')

const __merge = (dst, dst_start, a, a_start, a_end, b, b_start, b_end, fn) => {
	let write_index = dst_start

	let a_index = a_start
	let b_index = b_start
	let a_item = a[a_index]
	let b_item = b[b_index]

	while (a_index < a_end && b_index < b_end) {
		const cmp = fn(a_item, b_item)
		if (cmp <= 0) {
			dst[write_index++] = a_item
			a_item = a[++a_index]
		} else {
			dst[write_index++] = b_item
			b_item = b[++b_index]
		}
	}

	const a_remaining = a_end - a_index
	a_remaining > 0 && __copy(dst, write_index, a, a_index, a_end)

	write_index += a_remaining

	const b_remaining = b_end - b_index
	b_remaining > 0 && __copy(dst, write_index, b, b_index, b_end)
}

const __mergeRight = (dst, dst_start, a, a_start, a_end, b, b_start, b_end, fn) => {
	const a_length = a_end - a_start
	const b_length = b_end - b_start
	let write_index = dst_start + a_length + b_length - 1

	let a_index = a_end - 1
	let b_index = b_end - 1
	let a_item = a[a_index]
	let b_item = b[b_index]

	while (a_index >= a_start && b_index >= b_start) {
		const cmp = fn(a_item, b_item)
		if (cmp > 0) {
			dst[write_index--] = a_item
			a_item = a[--a_index]
		} else {
			dst[write_index--] = b_item
			b_item = b[--b_index]
		}
	}

	const b_remaining = (b_index - b_start) + 1
	if (b_remaining > 0) {
		write_index -= b_remaining
		__copyRight(dst, write_index + 1, b, b_start, b_index + 1)
	}

	const a_remaining = (a_index - a_start) + 1
	if (a_remaining > 0) {
		write_index -= a_remaining
		__copyRight(dst, write_index + 1, a, a_start, a_index + 1)
	}
}

const __mergeInplace = (arr, start, sep, end, buffer, fn) => {
	const a_length = sep - start
	const b_length = end - sep
	if (a_length <= b_length) {
		__copy(buffer, 0, arr, start, sep)
		__merge(arr, start, buffer, 0, a_length, arr, sep, end, fn)
	} else {
		__copy(buffer, 0, arr, sep, end)
		__mergeRight(arr, start, arr, start, sep, buffer, 0, b_length, fn)
	}
}

const mergeWith = (a, b, fn) => {
	const res = Array(a.length + b.length)
	__merge(res, 0, a, 0, a.length, b, 0, b.length, fn)
	return res
}

const mergeBy = (a, b, fn) => mergeWith(a, b, (x, y) => compare(fn(x), fn(y)))

const merge = (a, b) => mergeBy(a, b, identity)

module.exports = {
	__merge,
	__mergeRight,
	__mergeInplace,
	mergeWith,
	mergeBy,
	merge,
}
