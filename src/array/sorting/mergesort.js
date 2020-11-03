const { __mergeInplace } = require('../merge')
const { __insertionsort } = require('./insertionsort')
const { compare } = require('../../function/compare')
const { clone } = require('../clone')
const { map } = require('../map')

const extract = ({ x }) => x

const INSERTION_SORT_CUTOFF = 16

const __recurse = (arr, buffer, start, end, fn, cutoff, takeover) => {
	const length = end - start
	if (length <= 1) { return }
	if (length <= cutoff) {
		takeover(arr, start, start + 1, end, fn)
		return
	}

	const mid = start + Math.floor(length / 2)
	__recurse(arr, buffer, start, mid, fn, cutoff, takeover)
	__recurse(arr, buffer, mid, end, fn, cutoff, takeover)
	__mergeInplace(arr, start, mid, end, buffer, fn)
}

const __mergesort = (arr, start, end, fn, cutoff, takeover) => {
	const buffer = Array(Math.floor((end - start) / 2))
	__recurse(arr, buffer, start, end, fn, cutoff, takeover)
}

const mergesortWith$$$ = (arr, fn) => {
	__mergesort(arr, 0, arr.length, fn, INSERTION_SORT_CUTOFF, __insertionsort)
	return arr
}

const mergesortWith = (arr, fn) => mergesortWith$$$(clone(arr), fn)

mergesortWith.$$$ = mergesortWith$$$

const mergesortBy$$$ = (arr, fn) => mergesortWith$$$(arr, (a, b) => compare(fn(a), fn(b)))

const mergesortBy = (arr, fn) => mergesortWith(arr, (a, b) => compare(fn(a), fn(b)))

mergesortBy.$$$ = mergesortBy$$$

const mergesortByPure$$$ = (arr, fn) => {
	map.$$$(arr, (x) => ({ x, value: fn(x) }))
	mergesortWith$$$(arr, (a, b) => compare(a.value, b.value))
	return map.$$$(arr, extract)
}

const mergesortByPure = (arr, fn) => {
	const res = map(arr, (x) => ({ x, value: fn(x) }))
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
