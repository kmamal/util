const { __filter } = require('./filter')
const { __includes } = require('./includes')
const { __comm } = require('./comm')
const { eq } = require('../operators')
const { compare } = require('../function/compare')
const { map } = require('./map')

const extract = ({ x }) => x

const __difference = (dst, dst_start, a, a_start, a_end, b, b_start, b_end, fn) => {
	const pred = (x) => !__includes(b, b_start, b_end, x, fn)
	return __filter(dst, dst_start, a, a_start, a_end, pred)
}

const __differenceSorted = (dst, dst_start, a, a_start, a_end, b, b_start, b_end, fn) => {
	const diff = { arr: dst, index: dst_start }
	__comm(diff, null, null, a, a_start, a_end, b, b_start, b_end, fn)
	return diff.index - dst_start
}

const differenceWith$$$ = (a, b, fn) => {
	const n = __difference(a, 0, a, 0, a.length, b, 0, b.length, fn)
	a.length = n
	return a
}

const differenceWith = (a, b, fn) => {
	const res = []
	__difference(res, 0, a, 0, a.length, b, 0, b.length, fn)
	return res
}

differenceWith.$$$ = differenceWith$$$

const differenceBy$$$ = (a, b, fn) => differenceWith$$$(a, b, (x, y) => eq(fn(x), fn(y)))

const differenceBy = (a, b, fn) => differenceWith(a, b, (x, y) => eq(fn(x), fn(y)))

differenceBy.$$$ = differenceBy$$$

const differenceByPure$$$ = (a, b, fn) => {
	map.$$$(a, (x) => ({ x, value: fn(x) }))
	map.$$$(b, (x) => ({ x, value: fn(x) }))
	differenceWith$$$(a, b, (x, y) => eq(x.value, y.value))
	map.$$$(b, extract)
	return map.$$$(a, extract)
}

const differenceByPure = (a, b, fn) => {
	const res = map(a, (x) => ({ x, value: fn(x) }))
	map.$$$(b, (x) => ({ x, value: fn(x) }))
	differenceWith$$$(res, b, (x, y) => eq(x.value, y.value))
	map.$$$(b, extract)
	return map.$$$(res, extract)
}

differenceByPure.$$$ = differenceByPure$$$

const difference$$$ = (a, b) => differenceWith$$$(a, b, eq)

const difference = (a, b) => differenceWith(a, b, eq)

difference.$$$ = difference$$$

const differenceWithSorted$$$ = (a, b, fn) => {
	const n = __differenceSorted(a, 0, a, 0, a.length, b, 0, b.length, fn)
	a.length = n
	return a
}

const differenceWithSorted = (a, b, fn) => {
	const res = []
	__differenceSorted(res, 0, a, 0, a.length, b, 0, b.length, fn)
	return res
}

differenceWithSorted.$$$ = differenceWithSorted$$$

const differenceBySorted$$$ = (a, b, fn) => differenceWithSorted$$$(a, b, (x, y) => compare(fn(x), fn(y)))

const differenceBySorted = (a, b, fn) => differenceWithSorted(a, b, (x, y) => compare(fn(x), fn(y)))

differenceBySorted.$$$ = differenceBySorted$$$

// HACK: Depends on knowing the algo internals
const differenceByPureSorted$$$ = (a, b, fn) => {
	let last_x = NaN
	let last_y = NaN
	let x_value = NaN
	let y_value = NaN
	return differenceWithSorted$$$(a, b, (x, y) => {
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

const differenceByPureSorted = (a, b, fn) => {
	let last_x = NaN
	let last_y = NaN
	let x_value = NaN
	let y_value = NaN
	return differenceWithSorted(a, b, (x, y) => {
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

differenceByPureSorted.$$$ = differenceByPureSorted$$$

const difference$$$Sorted = (a, b) => differenceWithSorted$$$(a, b, compare)

const differenceSorted = (a, b) => differenceWithSorted(a, b, compare)

differenceSorted.$$$ = difference$$$Sorted

module.exports = {
	__difference,
	differenceWith,
	differenceBy,
	differenceByPure,
	difference,
	differenceWithSorted,
	differenceBySorted,
	differenceByPureSorted,
	differenceSorted,
}
