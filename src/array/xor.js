const { __difference } = require('./difference')
const { __comm } = require('./comm')
const { eq } = require('../operators')
const { compare } = require('../function/compare')
const { map } = require('./map')

const extract = ({ x }) => x

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
	let last_x = NaN
	let last_y = NaN
	let x_value = NaN
	let y_value = NaN
	return xorWithSorted(a, b, (x, y) => {
		if (x !== last_x) {
			last_x = x
			x_value = fn(x)
		}
		if (y !== last_y) {
			last_y = y
			y_value = fn(y)
		}
		return compare(x_value, y_value)
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
