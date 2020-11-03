const { __filter } = require('./filter')
const { __includes } = require('./includes')
const { __comm } = require('./comm')
const { eq } = require('../operators')
const { compare } = require('../function/compare')
const { map } = require('./map')

const extract = ({ x }) => x

const __intersection = (dst, dst_start, a, a_start, a_end, b, b_start, b_end, fn) => {
	const pred = (x) => __includes(b, b_start, b_end, x, fn)
	return __filter(dst, dst_start, a, a_start, a_end, pred)
}

const __intersectionSorted = (dst, dst_start, a, a_start, a_end, b, b_start, b_end, fn) => {
	const inter = { arr: dst, index: dst_start }
	__comm(null, inter, null, a, a_start, a_end, b, b_start, b_end, fn)
	return inter.index - dst_start
}

const intersectionWith$$$ = (a, b, fn) => {
	const n = __intersection(a, 0, a, 0, a.length, b, 0, b.length, fn)
	a.length = n
	return a
}

const intersectionWith = (a, b, fn) => {
	const res = []
	__intersection(res, 0, a, 0, a.length, b, 0, b.length, fn)
	return res
}

intersectionWith.$$$ = intersectionWith$$$

const intersectionBy$$$ = (a, b, fn) => intersectionWith$$$(a, b, (x, y) => eq(fn(x), fn(y)))

const intersectionBy = (a, b, fn) => intersectionWith(a, b, (x, y) => eq(fn(x), fn(y)))

intersectionBy.$$$ = intersectionBy$$$

const intersectionByPure$$$ = (a, b, fn) => {
	map.$$$(a, (x) => ({ x, value: fn(x) }))
	map.$$$(b, (x) => ({ x, value: fn(x) }))
	intersectionWith$$$(a, b, (x, y) => eq(x.value, y.value))
	map.$$$(b, extract)
	return map.$$$(a, extract)
}

const intersectionByPure = (a, b, fn) => {
	const res = map(a, (x) => ({ x, value: fn(x) }))
	map.$$$(b, (x) => ({ x, value: fn(x) }))
	intersectionWith$$$(res, b, (x, y) => eq(x.value, y.value))
	map.$$$(b, extract)
	return map.$$$(res, extract)
}

intersectionByPure.$$$ = intersectionByPure$$$

const intersection$$$ = (a, b) => intersectionWith$$$(a, b, eq)

const intersection = (a, b) => intersectionWith(a, b, eq)

intersection.$$$ = intersection$$$

const intersectionWithSorted$$$ = (a, b, fn) => {
	const n = __intersectionSorted(a, 0, a, 0, a.length, b, 0, b.length, fn)
	a.length = n
	return a
}

const intersectionWithSorted = (a, b, fn) => {
	const res = []
	__intersectionSorted(res, 0, a, 0, a.length, b, 0, b.length, fn)
	return res
}

intersectionWithSorted.$$$ = intersectionWithSorted$$$

const intersectionBySorted$$$ = (a, b, fn) => intersectionWithSorted$$$(a, b, (x, y) => compare(fn(x), fn(y)))

const intersectionBySorted = (a, b, fn) => intersectionWithSorted(a, b, (x, y) => compare(fn(x), fn(y)))

intersectionBySorted.$$$ = intersectionBySorted$$$

// HACK: Depends on knowing the algo internals
const intersectionByPureSorted$$$ = (a, b, fn) => {
	let last_x = NaN
	let last_y = NaN
	let x_value = NaN
	let y_value = NaN
	return intersectionWithSorted$$$(a, b, (x, y) => {
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

const intersectionByPureSorted = (a, b, fn) => {
	let last_x = NaN
	let last_y = NaN
	let x_value = NaN
	let y_value = NaN
	return intersectionWithSorted(a, b, (x, y) => {
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

intersectionByPureSorted.$$$ = intersectionByPureSorted$$$

const intersectionSorted$$$ = (a, b) => intersectionWithSorted$$$(a, b, compare)

const intersectionSorted = (a, b) => intersectionWithSorted(a, b, compare)

intersectionSorted.$$$ = intersectionSorted$$$

module.exports = {
	__intersection,
	intersectionWith,
	intersectionBy,
	intersectionByPure,
	intersection,
	intersectionWithSorted,
	intersectionBySorted,
	intersectionByPureSorted,
	intersectionSorted,
}
