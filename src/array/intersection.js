const { __filter } = require('./filter')
const { __includes } = require('./includes')
const { __comm } = require('./comm')
const { eq } = require('../operators')
const { compare, compareBy } = require('../function/compare')

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

const intersectionBySorted$$$ = (a, b, fnMap) => intersectionWithSorted$$$(a, b, compareBy(fnMap))

const intersectionBySorted = (a, b, fnMap) => intersectionWithSorted(a, b, compareBy(fnMap))

intersectionBySorted.$$$ = intersectionBySorted$$$

const intersectionSorted$$$ = (a, b) => intersectionWithSorted$$$(a, b, compare)

const intersectionSorted = (a, b) => intersectionWithSorted(a, b, compare)

intersectionSorted.$$$ = intersectionSorted$$$

module.exports = {
	__intersection,
	intersectionWith,
	intersectionBy,
	intersection,
	intersectionWithSorted,
	intersectionBySorted,
	intersectionSorted,
}
