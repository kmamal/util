const { __quicksort } = require('./quicksort')
const { __heapsort } = require('./heapsort')
const { __insertionsort } = require('./insertionsort')
const { compare } = require('../../function/compare')
const { clone } = require('../clone')
const { map } = require('../map')

const extract = ({ x }) => x

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

const introsortBy$$$ = (arr, fnMap) => introsortWith$$$(arr, (a, b) => compare(fnMap(a), fnMap(b)))

const introsortBy = (arr, fnMap) => introsortWith(arr, (a, b) => compare(fnMap(a), fnMap(b)))

introsortBy.$$$ = introsortBy$$$

const introsortByPure$$$ = (arr, fnMap) => {
	if (arr.length <= 1) { return arr }
	map.$$$(arr, (x) => ({ x, value: fnMap(x) }))
	introsortWith$$$(arr, (a, b) => compare(a.value, b.value))
	return map.$$$(arr, extract)
}

const introsortByPure = (arr, fnMap) => {
	if (arr.length <= 1) { return clone(arr) }
	const res = map(arr, (x) => ({ x, value: fnMap(x) }))
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
