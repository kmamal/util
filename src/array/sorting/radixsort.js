const {
	__countingsortDistribute,
} = require('./countingsort')
const { fill } = require('../fill')
const { clone } = require('../clone')
const { copy$$$ } = require('../copy')
const { identity } = require('../../function/identity')

const _getByte = [
	(x) => x & 0xFF,
	(x) => (x & 0xFF00) >>> 8,
	(x) => (x & 0xFF0000) >>> 16,
	(x) => (x & 0xFF000000) >>> 24,
]

const _counts = [
	new Array(256),
	new Array(256),
	new Array(256),
	new Array(256),
]

const __radixsort = (arr, start, end, buffer, numBytes, fnMap) => {
	const length = end - start

	for (let i = 0; i < numBytes; i++) {
		fill.$$$(_counts[i], 0)
	}

	for (let i = start; i < end; i++) {
		const item = arr[i]
		const value = fnMap(item)
		for (let j = 0; j < numBytes; j++) {
			const byteValue = _getByte[j](value)
			_counts[j][byteValue]++
		}
	}

	let src = arr
	let srcStart = start
	let dst = buffer
	let dstStart = 0

	let index = 0
	for (;;) {
		const getByte = _getByte[index]
		const fnMapByte = (x) => getByte(fnMap(x))

		const counts = _counts[index]
		const canSkip = counts[0] === length

		if (!canSkip) {
			__countingsortDistribute(dst, dstStart, src, srcStart, srcStart + length, counts, fnMapByte)
		}

		if (++index === numBytes) { return canSkip ? src : dst }

		if (!canSkip) {
			const tmp = src
			const tmpStart = srcStart
			src = dst
			srcStart = dstStart
			dst = tmp
			dstStart = tmpStart
		}
	}
}

const radixsortBy$$$ = (arr, fnMap) => {
	const { length } = arr
	if (length <= 1) { return arr }

	const buffer = new Array(length)
	const dst = __radixsort(arr, 0, length, buffer, 4, fnMap)
	if (dst === buffer) { copy$$$(arr, buffer) }
	return arr
}

const radixsortBy = (arr, fnMap) => {
	const { length } = arr
	if (length <= 1) { return clone(arr) }

	const res = clone(arr)
	const buffer = new Array(length)
	return __radixsort(res, 0, length, buffer, 4, fnMap)
}

radixsortBy.$$$ = radixsortBy$$$

const radixsort$$$ = (arr) => {
	const { length } = arr
	if (length <= 1) { return arr }

	const buffer = new Array(length)
	const dst = __radixsort(arr, 0, length, buffer, 4, identity)
	if (dst === buffer) { copy$$$(arr, buffer) }
	return arr
}

const radixsort = (arr) => {
	const { length } = arr
	if (length <= 1) { return clone(arr) }

	const res = clone(arr)
	const buffer = new Array(length)
	return __radixsort(res, 0, length, buffer, 4, identity)
}

radixsort.$$$ = radixsort$$$

module.exports = {
	__radixsort,
	radixsortBy,
	radixsort,
}
