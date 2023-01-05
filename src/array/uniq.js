const { __includes } = require('./includes')
const { eq } = require('../operators')
const { compare } = require('../function/compare')

const __uniq = (dst, dstStart, src, srcStart, srcEnd, fn) => {
	if (srcEnd - srcStart === 0) { return 0 }

	let writeIndex = dstStart
	let readIndex = srcStart

	let item = src[readIndex++]
	dst[writeIndex++] = item

	while (readIndex < srcEnd) {
		item = src[readIndex++]
		const exists = __includes(dst, dstStart, writeIndex, item, fn)
		if (exists) { continue }
		dst[writeIndex++] = item
	}

	return writeIndex - dstStart
}

const __uniqSorted = (dst, dstStart, src, srcStart, srcEnd, fn) => {
	if (srcEnd - srcStart === 0) { return 0 }

	let writeIndex = dstStart
	let readIndex = srcStart

	let item = src[readIndex++]
	dst[writeIndex++] = item
	let prev = item

	while (readIndex < srcEnd) {
		item = src[readIndex++]
		if (fn(item, prev) === 0) { continue }
		dst[writeIndex++] = item
		prev = item
	}

	return writeIndex - dstStart
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

const uniq$$$ = (arr) => uniqWith$$$(arr, eq)

const uniq = (arr) => uniqWith(arr, eq)

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

const uniqSorted$$$ = (arr) => uniqWithSorted$$$(arr, compare)

const uniqSorted = (arr) => uniqWithSorted(arr, compare)

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
