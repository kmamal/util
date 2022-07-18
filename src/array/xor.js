const { __difference } = require('./difference')
const { __comm } = require('./comm')
const { eq } = require('../operators')
const { compare } = require('../function/compare')
const { map } = require('./map')

const extract = ({ x }) => x

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

const xorByPure = (a, b, fn) => {
	map.$$$(a, (x) => ({ x, value: fn(x) }))
	map.$$$(b, (x) => ({ x, value: fn(x) }))
	const res = xorWith(a, b, (x, y) => eq(x.value, y.value))
	map.$$$(b, extract)
	map.$$$(a, extract)
	map.$$$(res, extract)
	return res
}

const xor = (a, b) => xorWith(a, b, eq)

const xorWithSorted = (a, b, fn) => {
	const res = []
	__xorSorted(res, 0, a, 0, a.length, b, 0, b.length, fn)
	return res
}

const xorBySorted = (a, b, fn) => xorWithSorted(a, b, (x, y) => compare(fn(x), fn(y)))

const xorByPureSorted = (a, b, fn) => {
	let lastX = NaN
	let lastY = NaN
	let xValue = NaN
	let yValue = NaN
	return xorWithSorted(a, b, (x, y) => {
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

const xorSorted = (a, b) => xorWithSorted(a, b, compare)

module.exports = {
	__xor,
	__xorSorted,
	xorWith,
	xorBy,
	xorByPure,
	xor,
	xorWithSorted,
	xorBySorted,
	xorByPureSorted,
	xorSorted,
}
