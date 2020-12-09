const { __filter } = require('./filter')
const { __includes } = require('./includes')
const { __comm } = require('./comm')
const { eq } = require('../operators')
const { compare } = require('../function/compare')
const { map } = require('./map')

const extract = ({ x }) => x

const __intersection = (dst, dst_start, a, a_start, a_end, b, b_start, b_end, fn_eq) => {
	const fn_pred = (x) => __includes(b, b_start, b_end, x, fn_eq)
	return __filter(dst, dst_start, a, a_start, a_end, fn_pred)
}

const __intersectionSorted = (dst, dst_start, a, a_start, a_end, b, b_start, b_end, fn_cmp) => {
	const inter = { arr: dst, index: dst_start }
	__comm(null, inter, null, a, a_start, a_end, b, b_start, b_end, fn_cmp)
	return inter.index - dst_start
}

const intersectionWith$$$ = (a, b, fn_eq) => {
	const n = __intersection(a, 0, a, 0, a.length, b, 0, b.length, fn_eq)
	a.length = n
	return a
}

const intersectionWith = (a, b, fn_eq) => {
	const res = []
	__intersection(res, 0, a, 0, a.length, b, 0, b.length, fn_eq)
	return res
}

intersectionWith.$$$ = intersectionWith$$$

const intersectionBy$$$ = (a, b, fn_map) => intersectionWith$$$(a, b, (x, y) => eq(fn_map(x), fn_map(y)))

const intersectionBy = (a, b, fn_map) => intersectionWith(a, b, (x, y) => eq(fn_map(x), fn_map(y)))

intersectionBy.$$$ = intersectionBy$$$

const intersectionByPure$$$ = (a, b, fn_map) => {
	map.$$$(a, (x) => ({ x, value: fn_map(x) }))
	map.$$$(b, (x) => ({ x, value: fn_map(x) }))
	intersectionWith$$$(a, b, (x, y) => eq(x.value, y.value))
	map.$$$(b, extract)
	return map.$$$(a, extract)
}

const intersectionByPure = (a, b, fn_map) => {
	const res = map(a, (x) => ({ x, value: fn_map(x) }))
	map.$$$(b, (x) => ({ x, value: fn_map(x) }))
	intersectionWith$$$(res, b, (x, y) => eq(x.value, y.value))
	map.$$$(b, extract)
	return map.$$$(res, extract)
}

intersectionByPure.$$$ = intersectionByPure$$$

const intersection$$$ = (a, b) => intersectionWith$$$(a, b, eq)

const intersection = (a, b) => intersectionWith(a, b, eq)

intersection.$$$ = intersection$$$

const intersectionWithSorted$$$ = (a, b, fn_cmp) => {
	const n = __intersectionSorted(a, 0, a, 0, a.length, b, 0, b.length, fn_cmp)
	a.length = n
	return a
}

const intersectionWithSorted = (a, b, fn_cmp) => {
	const res = []
	__intersectionSorted(res, 0, a, 0, a.length, b, 0, b.length, fn_cmp)
	return res
}

intersectionWithSorted.$$$ = intersectionWithSorted$$$

const intersectionBySorted$$$ = (a, b, fn_map) => intersectionWithSorted$$$(a, b, (x, y) => compare(fn_map(x), fn_map(y)))

const intersectionBySorted = (a, b, fn_map) => intersectionWithSorted(a, b, (x, y) => compare(fn_map(x), fn_map(y)))

intersectionBySorted.$$$ = intersectionBySorted$$$

// HACK: Depends on knowing the algo internals
const intersectionByPureSorted$$$ = (a, b, fn_map) => {
	let last_x = NaN
	let last_y = NaN
	let x_value = NaN
	let y_value = NaN
	return intersectionWithSorted$$$(a, b, (x, y) => {
		if (x !== last_x) {
			last_x = x
			x_value = fn_map(x)
		}
		if (y !== last_y) {
			last_y = y
			y_value = fn_map(y)
		}
		return compare(x_value, y_value)
	})
}

const intersectionByPureSorted = (a, b, fn_map) => {
	let last_x = NaN
	let last_y = NaN
	let x_value = NaN
	let y_value = NaN
	return intersectionWithSorted(a, b, (x, y) => {
		if (x !== last_x) {
			last_x = x
			x_value = fn_map(x)
		}
		if (y !== last_y) {
			last_y = y
			y_value = fn_map(y)
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
