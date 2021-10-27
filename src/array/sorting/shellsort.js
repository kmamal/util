const { compare } = require('../../function/compare')
const { clone } = require('../clone')
const { map } = require('../map')

const extract = ({ x }) => x

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

const shellsortBy$$$ = (arr, fnMap) => shellsortWith$$$(arr, (a, b) => compare(fnMap(a), fnMap(b)))

const shellsortBy = (arr, fnMap) => shellsortWith(arr, (a, b) => compare(fnMap(a), fnMap(b)))

shellsortBy.$$$ = shellsortBy$$$

const shellsortByPure$$$ = (arr, fnMap) => {
	if (arr.length <= 1) { return arr }
	map.$$$(arr, (x) => ({ x, value: fnMap(x) }))
	shellsortWith$$$(arr, (a, b) => compare(a.value, b.value))
	return map.$$$(arr, extract)
}

const shellsortByPure = (arr, fnMap) => {
	if (arr.length <= 1) { return clone(arr) }
	const res = map(arr, (x) => ({ x, value: fnMap(x) }))
	shellsortWith$$$(res, (a, b) => compare(a.value, b.value))
	return map.$$$(res, extract)
}

shellsortByPure.$$$ = shellsortByPure$$$

const shellsort$$$ = (arr) => shellsortWith$$$(arr, compare)

const shellsort = (arr) => shellsortWith(arr, compare)

shellsort.$$$ = shellsort$$$

module.exports = {
	__shellsort,
	shellsortWith,
	shellsortBy,
	shellsortByPure,
	shellsort,
}
