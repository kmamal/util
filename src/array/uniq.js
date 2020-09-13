const { __includes } = require('./includes')
const { eq } = require('../operators')
const { compare } = require('../function/compare')
const { identity } = require('../function/identity')

const __uniq = (dst, dst_start, src, src_start, src_end, fn) => {
	if (src_end - src_start === 0) { return 0 }

	let write_index = dst_start
	let read_index = src_start

	let item = src[read_index++]
	dst[write_index++] = item

	while (read_index < src_end) {
		item = src[read_index++]
		const exists = __includes(dst, dst_start, write_index, item, fn)
		if (exists) { continue }
		dst[write_index++] = item
	}

	return write_index - dst_start
}

const __uniqSorted = (dst, dst_start, src, src_start, src_end, fn) => {
	if (src_end - src_start === 0) { return 0 }

	let write_index = dst_start
	let read_index = src_start

	let item = src[read_index++]
	dst[write_index++] = item
	let prev = item

	while (read_index < src_end) {
		item = src[read_index++]
		if (fn(item, prev) === 0) { continue }
		dst[write_index++] = item
		prev = item
	}

	return write_index - dst_start
}

const uniqWith$$$ = (arr, fn) => {
	const n = __uniq(arr, 0, arr, 0, arr.length, fn)
	arr.length = n
	return arr
}

const uniqWith = (arr, fn) => {
	const res = []
	__uniq(res, 0, arr, 0, arr.length, fn)
	return res
}

uniqWith.$$$ = uniqWith$$$

const uniqBy$$$ = (arr, fn) => uniqWith$$$(arr, (x, y) => eq(fn(x), fn(y)))

const uniqBy = (arr, fn) => uniqWith(arr, (x, y) => eq(fn(x), fn(y)))

uniqBy.$$$ = uniqBy$$$

const uniq$$$ = (arr) => uniqBy$$$(arr, identity)

const uniq = (arr) => uniqBy(arr, identity)

uniq.$$$ = uniq$$$

const uniqWithSorted$$$ = (arr, fn) => {
	const n = __uniqSorted(arr, 0, arr, 0, arr.length, fn)
	arr.length = n
	return arr
}

const uniqWithSorted = (arr, fn) => {
	const res = []
	__uniqSorted(res, 0, arr, 0, arr.length, fn)
	return res
}

uniqWithSorted.$$$ = uniqWithSorted$$$

const uniqBySorted$$$ = (arr, fn) => uniqWithSorted$$$(arr, (x, y) => compare(fn(x), fn(y)))

const uniqBySorted = (arr, fn) => uniqWithSorted(arr, (x, y) => compare(fn(x), fn(y)))

uniqBySorted.$$$ = uniqBySorted$$$

const uniqSorted$$$ = (arr) => uniqBySorted$$$(arr, identity)

const uniqSorted = (arr) => uniqBySorted(arr, identity)

uniqSorted.$$$ = uniqSorted$$$

module.exports = {
	__uniq,
	uniqWith,
	uniqBy,
	uniq,
	uniqWithSorted,
	uniqBySorted,
	uniqSorted,
}
