const { __difference } = require('./difference')
const { __comm } = require('./comm')
const { eq } = require('../operators')
const { compare } = require('../function/compare')
const { identity } = require('../function/identity')

const __xor = (dst, dst_start, a, a_start, a_end, b, b_start, b_end, fn) => {
	const n = __difference(dst, dst_start, a, a_start, a_end, b, b_start, b_end, fn)
	const m = __difference(dst, dst_start + n, b, b_start, b_end, a, a_start, a_end, fn)
	return n + m
}

const __xorSorted = (dst, dst_start, a, a_start, a_end, b, b_start, b_end, fn) => {
	const xor = { arr: dst, index: dst_start }
	__comm(xor, null, xor, a, a_start, a_end, b, b_start, b_end, fn)
	return xor.index - dst_start
}

const xorWith = (a, b, fn) => {
	const res = []
	__xor(res, 0, a, 0, a.length, b, 0, b.length, fn)
	return res
}

const xorBy = (a, b, fn) => xorWith(a, b, (x, y) => eq(fn(x), fn(y)))

const xor = (a, b) => xorBy(a, b, identity)

const xorWithSorted = (a, b, fn) => {
	const res = []
	__xorSorted(res, 0, a, 0, a.length, b, 0, b.length, fn)
	return res
}

const xorBySorted = (a, b, fn) => xorWithSorted(a, b, (x, y) => compare(fn(x), fn(y)))

const xorSorted = (a, b) => xorBySorted(a, b, identity)

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
