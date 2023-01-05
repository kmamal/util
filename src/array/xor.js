const { __difference } = require('./difference')
const { __comm } = require('./comm')
const { eq } = require('../operators')
const { compare } = require('../function/compare')

const __xor = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fn) => {
	const n = __difference(dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fn)
	const m = __difference(dst, dstStart + n, b, bStart, bEnd, a, aStart, aEnd, fn)
	return n + m
}

const __xorSorted = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fn) => {
	const xor = { arr: dst, index: dstStart }
	__comm(xor, null, xor, a, aStart, aEnd, b, bStart, bEnd, fn)
	return xor.index - dstStart
}

const xorWith = (a, b, fn) => {
	const res = []
	__xor(res, 0, a, 0, a.length, b, 0, b.length, fn)
	return res
}

const xorBy = (a, b, fn) => xorWith(a, b, (x, y) => eq(fn(x), fn(y)))

const xor = (a, b) => xorWith(a, b, eq)

const xorWithSorted = (a, b, fn) => {
	const res = []
	__xorSorted(res, 0, a, 0, a.length, b, 0, b.length, fn)
	return res
}

const xorBySorted = (a, b, fn) => xorWithSorted(a, b, (x, y) => compare(fn(x), fn(y)))

const xorSorted = (a, b) => xorWithSorted(a, b, compare)

module.exports = {
	__xor,
	__xorSorted,
	xorWith,
	xorBy,
	xor,
	xorWithSorted,
	xorBySorted,
	xorSorted,
}
