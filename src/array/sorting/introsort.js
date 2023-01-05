const { __quicksort } = require('./quicksort')
const { __heapsort } = require('./heapsort')
const { __insertionsort } = require('./insertionsort')
const { compare, compareBy } = require('../../function/compare')
const { clone } = require('../clone')

const INSERTION_SORT_CUTOFF = 16

const takeover = (arr, start, sortedEnd, end, fnCmp) => end - start <= INSERTION_SORT_CUTOFF
	? __insertionsort(arr, start, sortedEnd, end, fnCmp)
	: __heapsort(arr, start, end, fnCmp)

const __introsort = (arr, start, end, fnCmp) => {
	const heapsortCutoff = 2 * Math.log(end - start)
	__quicksort(arr, start, end, fnCmp, INSERTION_SORT_CUTOFF, heapsortCutoff, takeover)
}

const introsortWith$$$ = (arr, fnCmp) => {
	if (arr.length > 1) {
		__introsort(arr, 0, arr.length, fnCmp)
	}
	return arr
}

const introsortWith = (arr, fnCmp) => introsortWith$$$(clone(arr), fnCmp)

introsortWith.$$$ = introsortWith$$$

const introsortBy$$$ = (arr, fnMap) => introsortWith$$$(arr, compareBy(fnMap))

const introsortBy = (arr, fnMap) => introsortWith(arr, compareBy(fnMap))

introsortBy.$$$ = introsortBy$$$

const introsort$$$ = (arr) => introsortWith$$$(arr, compare)

const introsort = (arr) => introsortWith(arr, compare)

introsort.$$$ = introsort$$$

module.exports = {
	__introsort,
	introsortWith,
	introsortBy,
	introsort,
}
