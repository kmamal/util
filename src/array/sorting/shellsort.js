const { compare, compareBy } = require('../../function/compare')
const { clone } = require('../clone')

// Marcin Ciura's gap sequence
const GAPS = [ 1750, 701, 301, 132, 57, 23, 10, 4, 1 ]

const __shellsort = (arr, start, sortedEnd, end, fnCmp) => {
	for (let g = 0; g < GAPS.length; g++) {
		const gap = GAPS[g]

		for (let i = sortedEnd + gap - 1; i < end; i++) {
			const item = arr[i]
			let lastJ = i
			let j = lastJ - gap
			while (j >= start) {
				const current = arr[j]
				if (fnCmp(current, item) <= 0) { break }
				arr[lastJ] = current
				lastJ = j
				j -= gap
			}
			arr[lastJ] = item
		}
	}
}

const shellsortWith$$$ = (arr, fnCmp) => {
	if (arr.length > 1) {
		__shellsort(arr, 0, 1, arr.length, fnCmp)
	}
	return arr
}

const shellsortWith = (arr, fnCmp) => shellsortWith$$$(clone(arr), fnCmp)

shellsortWith.$$$ = shellsortWith$$$

const shellsortBy$$$ = (arr, fnMap) => shellsortWith$$$(arr, compareBy(fnMap))

const shellsortBy = (arr, fnMap) => shellsortWith(arr, compareBy(fnMap))

shellsortBy.$$$ = shellsortBy$$$

const shellsort$$$ = (arr) => shellsortWith$$$(arr, compare)

const shellsort = (arr) => shellsortWith(arr, compare)

shellsort.$$$ = shellsort$$$

module.exports = {
	__shellsort,
	shellsortWith,
	shellsortBy,
	shellsort,
}
