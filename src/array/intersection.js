const { __filter } = require('./filter')
const { __includes } = require('./includes')
const { __comm } = require('./comm')
const { eq } = require('../operators')
const { compare } = require('../function/compare')
const { identity } = require('../function/identity')

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

const intersection$$$ = (a, b) => intersectionBy$$$(a, b, identity)

const intersection = (a, b) => intersectionBy(a, b, identity)

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

const intersectionSorted$$$ = (a, b) => intersectionBySorted$$$(a, b, identity)

const intersectionSorted = (a, b) => intersectionBySorted(a, b, identity)

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
