const { startIndex } = require('./start-index')
const { endIndex } = require('./end-index')

const __copy = (a, offset, b, start, end) => {
	let write_index = offset
	let read_index = start
	while (read_index < end) {
		a[write_index++] = b[read_index++]
	}
}

const __copyRight = (a, offset, b, start, end) => {
	const length = end - start
	let write_index = offset + length - 1
	let read_index = end - 1
	while (read_index >= start) {
		a[write_index--] = b[read_index--]
	}
}

const __copyInplace = (arr, offset, start, end) => {
	const overlaps_badly = start < offset && offset < end
	if (!overlaps_badly) {
		__copy(arr, offset, arr, start, end)
	} else {
		__copy(arr, offset, arr, start, end)
	}
}

const copy$$$ = (a, _offset, b, _start, _end) => {
	const offset = startIndex(a.length, _offset)
	const start = startIndex(b.length, _start)
	const end = endIndex(b.length, _end)
	if (a === b) {
		__copyInplace(a, offset, start, end)
	} else {
		__copy(a, offset, b, start, end)
	}
	return a
}

const copy = (a, _offset, b, _start, _end) => {
	const { length: a_length } = a
	const { length: b_length } = b
	const a_start = startIndex(a_length, _offset)
	const b_start = startIndex(b_length, _start)
	const b_end = endIndex(b_length, _end)
	const length = b_end - b_start
	const a_end = a_start + length

	const res = new Array(a_length)
	__copy(res, 0, a, 0, a_start)
	__copy(res, a_start, b, b_start, b_end)
	__copy(res, a_end, a, a_end, a_length)

	return res
}

copy.$$$ = copy$$$

module.exports = {
	__copy,
	__copyRight,
	__copyInplace,
	copy,
}
