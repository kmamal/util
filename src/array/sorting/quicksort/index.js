const { __selectPivotMedianOfThree } = require('./select-pivot-median-of-three')
const { __partitionLeftRight } = require('./partition-left-right')
const { __insertionsort } = require('../insertionsort')
const { compare } = require('../../../function/compare')
const { clone } = require('../../clone')
const { map } = require('../../map')

const extract = ({ x }) => x

const INSERTION_SORT_CUTOFF = 16

const __quicksort = (arr, _start, _end, fn, size_cutoff, depth_cutoff, takeover) => {
	const stack = [ { start: _start, end: _end, depth: 0 } ]
	for (;;) {
		const item = stack.pop()
		if (!item) { break }

		const { start, end, depth } = item

		const length = end - start
		if (length <= 1) { continue }
		if (length <= size_cutoff || depth === depth_cutoff) {
			takeover(arr, start, start + 1, end, fn)
			continue
		}

		const pivot = __selectPivotMedianOfThree(arr, start, end, fn)
		const { left, right } = __partitionLeftRight(arr, start, end, pivot, fn)

		stack.push({ start, end: left, depth: depth + 1 })
		stack.push({ start: right, end, depth: depth + 1 })
	}
}

const quicksortWith$$$ = (arr, fn) => {
	__quicksort(arr, 0, arr.length, fn, INSERTION_SORT_CUTOFF, Infinity, __insertionsort)
	return arr
}

const quicksortWith = (arr, fn) => quicksortWith$$$(clone(arr), fn)

quicksortWith.$$$ = quicksortWith$$$

const quicksortBy$$$ = (arr, fn) => quicksortWith$$$(arr, (a, b) => compare(fn(a), fn(b)))

const quicksortBy = (arr, fn) => quicksortWith(arr, (a, b) => compare(fn(a), fn(b)))

quicksortBy.$$$ = quicksortBy$$$

const quicksortByPure$$$ = (arr, fn) => {
	map.$$$(arr, (x) => ({ x, value: fn(x) }))
	quicksortWith$$$(arr, (a, b) => compare(a.value, b.value))
	return map.$$$(arr, extract)
}

const quicksortByPure = (arr, fn) => {
	const res = map(arr, (x) => ({ x, value: fn(x) }))
	quicksortWith$$$(res, (a, b) => compare(a.value, b.value))
	return map.$$$(res, extract)
}

quicksortByPure.$$$ = quicksortByPure$$$

const quicksort$$$ = (arr) => quicksortWith$$$(arr, compare)

const quicksort = (arr) => quicksortWith(arr, compare)

quicksort.$$$ = quicksort$$$

module.exports = {
	__quicksort,
	quicksortWith,
	quicksortBy,
	quicksortByPure,
	quicksort,
}
