const { __filter } = require('./filter')
const { __includes } = require('./includes')
const { __comm } = require('./comm')
const { eq } = require('../operators')
const { compare } = require('../function/compare')
const { map } = require('./map')

const extract = ({ x }) => x

const __intersection = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fnEq) => {
	const fnPred = (x) => __includes(b, bStart, bEnd, x, fnEq)
	return __filter(dst, dstStart, a, aStart, aEnd, fnPred)
}

const __intersectionSorted = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd, fnCmp) => {
	const inter = { arr: dst, index: dstStart }
	__comm(null, inter, null, a, aStart, aEnd, b, bStart, bEnd, fnCmp)
	return inter.index - dstStart
}

const intersectionWith$$$ = (a, b, fnEq) => {
	const n = __intersection(a, 0, a, 0, a.length, b, 0, b.length, fnEq)
	a.length = n
	return a
}

const intersectionWith = (a, b, fnEq) => {
	const res = []
	__intersection(res, 0, a, 0, a.length, b, 0, b.length, fnEq)
	return res
}

intersectionWith.$$$ = intersectionWith$$$

const intersectionBy$$$ = (a, b, fnMap) => intersectionWith$$$(a, b, (x, y) => eq(fnMap(x), fnMap(y)))

const intersectionBy = (a, b, fnMap) => intersectionWith(a, b, (x, y) => eq(fnMap(x), fnMap(y)))

intersectionBy.$$$ = intersectionBy$$$

const intersectionByPure$$$ = (a, b, fnMap) => {
	map.$$$(a, (x) => ({ x, value: fnMap(x) }))
	map.$$$(b, (x) => ({ x, value: fnMap(x) }))
	intersectionWith$$$(a, b, (x, y) => eq(x.value, y.value))
	map.$$$(b, extract)
	return map.$$$(a, extract)
}

const intersectionByPure = (a, b, fnMap) => {
	const res = map(a, (x) => ({ x, value: fnMap(x) }))
	map.$$$(b, (x) => ({ x, value: fnMap(x) }))
	intersectionWith$$$(res, b, (x, y) => eq(x.value, y.value))
	map.$$$(b, extract)
	return map.$$$(res, extract)
}

intersectionByPure.$$$ = intersectionByPure$$$

const intersection$$$ = (a, b) => intersectionWith$$$(a, b, eq)

const intersection = (a, b) => intersectionWith(a, b, eq)

intersection.$$$ = intersection$$$

const intersectionWithSorted$$$ = (a, b, fnCmp) => {
	const n = __intersectionSorted(a, 0, a, 0, a.length, b, 0, b.length, fnCmp)
	a.length = n
	return a
}

const intersectionWithSorted = (a, b, fnCmp) => {
	const res = []
	__intersectionSorted(res, 0, a, 0, a.length, b, 0, b.length, fnCmp)
	return res
}

intersectionWithSorted.$$$ = intersectionWithSorted$$$

const intersectionBySorted$$$ = (a, b, fnMap) => intersectionWithSorted$$$(a, b, (x, y) => compare(fnMap(x), fnMap(y)))

const intersectionBySorted = (a, b, fnMap) => intersectionWithSorted(a, b, (x, y) => compare(fnMap(x), fnMap(y)))

intersectionBySorted.$$$ = intersectionBySorted$$$

// HACK: Depends on knowing the algo internals
const intersectionByPureSorted$$$ = (a, b, fnMap) => {
	let lastX = NaN
	let lastY = NaN
	let xValue = NaN
	let yValue = NaN
	return intersectionWithSorted$$$(a, b, (x, y) => {
		if (x !== lastX) {
			lastX = x
			xValue = fnMap(x)
		}
		if (y !== lastY) {
			lastY = y
			yValue = fnMap(y)
		}
		return compare(xValue, yValue)
	})
}

const intersectionByPureSorted = (a, b, fnMap) => {
	let lastX = NaN
	let lastY = NaN
	let xValue = NaN
	let yValue = NaN
	return intersectionWithSorted(a, b, (x, y) => {
		if (x !== lastX) {
			lastX = x
			xValue = fnMap(x)
		}
		if (y !== lastY) {
			lastY = y
			yValue = fnMap(y)
		}
		return compare(xValue, yValue)
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
