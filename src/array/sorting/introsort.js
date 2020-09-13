const { __quicksort } = require('./quicksort')
const { __heapsort } = require('./heapsort')
const { __insertionsort } = require('./insertionsort')
const { compare } = require('../../function/compare')
const { identity } = require('../../function/identity')
const { clone } = require('../clone')

const INSERTION_SORT_CUTOFF = 16

const takeover = (arr, start, sorted_end, end, fn) => end - start <= INSERTION_SORT_CUTOFF
	? __insertionsort(arr, start, sorted_end, end, fn)
	: __heapsort(arr, start, end, fn)

const __introsort = (arr, start, end, fn) => {
	const heapsort_cutoff = 2 * Math.log(end - start)
	__quicksort(arr, start, end, fn, INSERTION_SORT_CUTOFF, heapsort_cutoff, takeover)
}

const introsortWith$$$ = (arr, fn) => {
	__introsort(arr, 0, arr.length, fn)
	return arr
}

const introsortWith = (arr, fn) => introsortWith$$$(clone(arr), fn)

introsortWith.$$$ = introsortWith$$$

const introsortBy$$$ = (arr, fn) => introsortWith$$$(arr, (a, b) => compare(fn(a), fn(b)))

const introsortBy = (arr, fn) => introsortWith(arr, (a, b) => compare(fn(a), fn(b)))

introsortBy.$$$ = introsortBy$$$

const introsort$$$ = (arr) => introsortBy$$$(arr, identity)

const introsort = (arr) => introsortBy(arr, identity)

introsort.$$$ = introsort$$$

module.exports = {
	__introsort,
	introsortWith,
	introsortBy,
	introsort,
}
