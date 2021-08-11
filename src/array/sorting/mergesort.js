const { __mergeInplace } = require('../merge')
const { __insertionsort } = require('./insertionsort')
const { compare } = require('../../function/compare')
const { clone } = require('../clone')
const { map } = require('../map')

const extract = ({ x }) => x

const INSERTION_SORT_CUTOFF = 16

const __recurse = (arr, buffer, start, end, fnCmp, cutoff, takeover) => {
	const length = end - start
	if (length <= 1) { return }
	if (length <= cutoff) {
		takeover(arr, start, start + 1, end, fnCmp)
		return
	}

	const mid = start + Math.floor(length / 2)
	__recurse(arr, buffer, start, mid, fnCmp, cutoff, takeover)
	__recurse(arr, buffer, mid, end, fnCmp, cutoff, takeover)
	__mergeInplace(arr, start, mid, end, buffer, fnCmp)
}

const __mergesort = (arr, start, end, fnCmp, cutoff, takeover) => {
	const buffer = new Array(Math.floor((end - start) / 2))
	__recurse(arr, buffer, start, end, fnCmp, cutoff, takeover)
}

const mergesortWith$$$ = (arr, fnCmp) => {
	__mergesort(arr, 0, arr.length, fnCmp, INSERTION_SORT_CUTOFF, __insertionsort)
	return arr
}

const mergesortWith = (arr, fnCmp) => mergesortWith$$$(clone(arr), fnCmp)

mergesortWith.$$$ = mergesortWith$$$

const mergesortBy$$$ = (arr, fnMap) => mergesortWith$$$(arr, (a, b) => compare(fnMap(a), fnMap(b)))

const mergesortBy = (arr, fnMap) => mergesortWith(arr, (a, b) => compare(fnMap(a), fnMap(b)))

mergesortBy.$$$ = mergesortBy$$$

const mergesortByPure$$$ = (arr, fnMap) => {
	map.$$$(arr, (x) => ({ x, value: fnMap(x) }))
	mergesortWith$$$(arr, (a, b) => compare(a.value, b.value))
	return map.$$$(arr, extract)
}

const mergesortByPure = (arr, fnMap) => {
	const res = map(arr, (x) => ({ x, value: fnMap(x) }))
	mergesortWith$$$(res, (a, b) => compare(a.value, b.value))
	return map.$$$(res, extract)
}

mergesortByPure.$$$ = mergesortByPure$$$

const mergesort$$$ = (arr) => mergesortWith$$$(arr, compare)

const mergesort = (arr) => mergesortWith(arr, compare)

mergesort.$$$ = mergesort$$$

module.exports = {
	__mergesort,
	mergesortWith,
	mergesortBy,
	mergesortByPure,
	mergesort,
}
