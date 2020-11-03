const { __quicksort } = require('./quicksort')
const { __heapsort } = require('./heapsort')
const { __insertionsort } = require('./insertionsort')
const { compare } = require('../../function/compare')
const { clone } = require('../clone')
const { map } = require('../map')

const extract = ({ x }) => x

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

const introsortByPure$$$ = (arr, fn) => {
	map.$$$(arr, (x) => ({ x, value: fn(x) }))
	introsortWith$$$(arr, (a, b) => compare(a.value, b.value))
	return map.$$$(arr, extract)
}

const introsortByPure = (arr, fn) => {
	const res = map(arr, (x) => ({ x, value: fn(x) }))
	introsortWith$$$(res, (a, b) => compare(a.value, b.value))
	return map.$$$(res, extract)
}

introsortByPure.$$$ = introsortByPure$$$

const introsort$$$ = (arr) => introsortWith$$$(arr, compare)

const introsort = (arr) => introsortWith(arr, compare)

introsort.$$$ = introsort$$$

module.exports = {
	__introsort,
	introsortWith,
	introsortBy,
	introsortByPure,
	introsort,
}
