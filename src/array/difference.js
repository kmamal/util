const { __filter } = require('./filter')
const { __includes } = require('./includes')
const { __comm } = require('./comm')
const { eq } = require('../operators')
const { compare } = require('../function/compare')
const { identity } = require('../function/identity')

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

const difference$$$ = (a, b) => differenceBy$$$(a, b, identity)

const difference = (a, b) => differenceBy(a, b, identity)

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

const difference$$$Sorted = (a, b) => differenceBySorted$$$(a, b, identity)

const differenceSorted = (a, b) => differenceBySorted(a, b, identity)

differenceSorted.$$$ = difference$$$Sorted

module.exports = {
	__difference,
	differenceWith,
	differenceBy,
	difference,
	differenceWithSorted,
	differenceBySorted,
	differenceSorted,
}
