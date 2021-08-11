const { __selectPivotMedianOfThree } = require('./select-pivot-median-of-three')
const { __partitionLeftRight } = require('./partition-left-right')
const { __insertionsort } = require('../insertionsort')
const { compare } = require('../../../function/compare')
const { clone } = require('../../clone')
const { map } = require('../../map')

const extract = ({ x }) => x

const INSERTION_SORT_CUTOFF = 16

const __quicksort = (arr, _start, _end, fnCmp, sizeCutoff, depthCutoff, takeover) => {
	const stack = [ { start: _start, end: _end, depth: 0 } ]
	for (;;) {
		const item = stack.pop()
		if (!item) { break }

		const { start, end, depth } = item

		const length = end - start
		if (length <= 1) { continue }
		if (length <= sizeCutoff || depth === depthCutoff) {
			takeover(arr, start, start + 1, end, fnCmp)
			continue
		}

		const pivot = __selectPivotMedianOfThree(arr, start, end, fnCmp)
		const { left, right } = __partitionLeftRight(arr, start, end, pivot, fnCmp)

		stack.push({ start, end: left, depth: depth + 1 })
		stack.push({ start: right, end, depth: depth + 1 })
	}
}

const quicksortWith$$$ = (arr, fnCmp) => {
	__quicksort(arr, 0, arr.length, fnCmp, INSERTION_SORT_CUTOFF, Infinity, __insertionsort)
	return arr
}

const quicksortWith = (arr, fnCmp) => quicksortWith$$$(clone(arr), fnCmp)

quicksortWith.$$$ = quicksortWith$$$

const quicksortBy$$$ = (arr, fnMap) => quicksortWith$$$(arr, (a, b) => compare(fnMap(a), fnMap(b)))

const quicksortBy = (arr, fnMap) => quicksortWith(arr, (a, b) => compare(fnMap(a), fnMap(b)))

quicksortBy.$$$ = quicksortBy$$$

const quicksortByPure$$$ = (arr, fnMap) => {
	map.$$$(arr, (x) => ({ x, value: fnMap(x) }))
	quicksortWith$$$(arr, (a, b) => compare(a.value, b.value))
	return map.$$$(arr, extract)
}

const quicksortByPure = (arr, fnMap) => {
	const res = map(arr, (x) => ({ x, value: fnMap(x) }))
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
