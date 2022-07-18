const { __copy, __copyRight } = require('./copy')
const { compare } = require('../function/compare')

const __merge = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fn) => {
	let writeIndex = dstStart

	let aIndex = aStart
	let bIndex = bStart
	let aItem = a[aIndex]
	let bItem = b[bIndex]

	while (aIndex < aEnd && bIndex < bEnd) {
		const cmp = fn(aItem, bItem)
		if (cmp <= 0) {
			dst[writeIndex++] = aItem
			aItem = a[++aIndex]
		} else {
			dst[writeIndex++] = bItem
			bItem = b[++bIndex]
		}
	}

	const aRemaining = aEnd - aIndex
	aRemaining > 0 && __copy(dst, writeIndex, a, aIndex, aEnd)

	writeIndex += aRemaining

	const bRemaining = bEnd - bIndex
	bRemaining > 0 && __copy(dst, writeIndex, b, bIndex, bEnd)
}

const __mergeRight = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fn) => {
	const aLength = aEnd - aStart
	const bLength = bEnd - bStart
	let writeIndex = dstStart + aLength + bLength - 1

	let aIndex = aEnd - 1
	let bIndex = bEnd - 1
	let aItem = a[aIndex]
	let bItem = b[bIndex]

	while (aIndex >= aStart && bIndex >= bStart) {
		const cmp = fn(aItem, bItem)
		if (cmp > 0) {
			dst[writeIndex--] = aItem
			aItem = a[--aIndex]
		} else {
			dst[writeIndex--] = bItem
			bItem = b[--bIndex]
		}
	}

	const bRemaining = (bIndex - bStart) + 1
	if (bRemaining > 0) {
		writeIndex -= bRemaining
		__copyRight(dst, writeIndex + 1, b, bStart, bIndex + 1)
	}

	const aRemaining = (aIndex - aStart) + 1
	if (aRemaining > 0) {
		writeIndex -= aRemaining
		__copyRight(dst, writeIndex + 1, a, aStart, aIndex + 1)
	}
}

const __mergeInplace = (arr, start, sep, end, buffer, fn) => {
	const aLength = sep - start
	const bLength = end - sep
	if (aLength <= bLength) {
		__copy(buffer, 0, arr, start, sep)
		__merge(arr, start, buffer, 0, aLength, arr, sep, end, fn)
	} else {
		__copy(buffer, 0, arr, sep, end)
		__mergeRight(arr, start, arr, start, sep, buffer, 0, bLength, fn)
	}
}

const mergeWith = (a, b, fn) => {
	const res = new Array(a.length + b.length)
	__merge(res, 0, a, 0, a.length, b, 0, b.length, fn)
	return res
}

const mergeBy = (a, b, fn) => mergeWith(a, b, (x, y) => compare(fn(x), fn(y)))

const mergeByPure = (a, b, fn) => {
	let lastX = NaN
	let lastY = NaN
	let xValue = NaN
	let yValue = NaN
	return mergeWith(a, b, (x, y) => {
		if (x !== lastX) {
			lastX = x
			xValue = fn(x)
		}
		if (y !== lastY) {
			lastY = y
			yValue = fn(y)
		}
		return compare(xValue, yValue)
	})
}

const merge = (a, b) => mergeWith(a, b, compare)

module.exports = {
	__merge,
	__mergeRight,
	__mergeInplace,
	mergeWith,
	mergeBy,
	mergeByPure,
	merge,
}
