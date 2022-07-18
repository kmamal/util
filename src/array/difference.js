const { __filter } = require('./filter')
const { __includes } = require('./includes')
const { __comm } = require('./comm')
const { eq } = require('../operators')
const { compare } = require('../function/compare')
const { map } = require('./map')

const extract = ({ x }) => x

const __difference = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fn) => {
	const pred = (x) => !__includes(b, bStart, bEnd, x, fn)
	return __filter(dst, dstStart, a, aStart, aEnd, pred)
}

const __differenceSorted = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fn) => {
	const diff = { arr: dst, index: dstStart }
	__comm(diff, null, null, a, aStart, aEnd, b, bStart, bEnd, fn)
	return diff.index - dstStart
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
	let lastX = NaN
	let lastY = NaN
	let xValue = NaN
	let yValue = NaN
	return differenceWithSorted$$$(a, b, (x, y) => {
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

const differenceByPureSorted = (a, b, fn) => {
	let lastX = NaN
	let lastY = NaN
	let xValue = NaN
	let yValue = NaN
	return differenceWithSorted(a, b, (x, y) => {
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
