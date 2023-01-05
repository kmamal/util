const { __heapify, __pop } = require('../heap')
const { compare, compareBy } = require('../../function/compare')
const { clone } = require('../clone')

const __heapsort = (arr, start, end, _fnCmp) => {
	const fnCmp = (a, b) => -_fnCmp(a, b)
	__heapify(arr, start, end, fnCmp)
	for (let i = end; i > start; i--) {
		__pop(arr, start, i, fnCmp)
	}
}

const heapsortWith$$$ = (arr, fnCmp) => {
	if (arr.length > 1) {
		__heapsort(arr, 0, arr.length, fnCmp)
	}
	return arr
}

const heapsortWith = (arr, fnCmp) => heapsortWith$$$(clone(arr), fnCmp)

heapsortWith.$$$ = heapsortWith$$$

const heapsortBy$$$ = (arr, fnMap) => heapsortWith$$$(arr, compareBy(fnMap))

const heapsortBy = (arr, fnMap) => heapsortWith(arr, compareBy(fnMap))

heapsortBy.$$$ = heapsortBy$$$

const heapsort$$$ = (arr) => heapsortWith$$$(arr, compare)

const heapsort = (arr) => heapsortWith(arr, compare)

heapsort.$$$ = heapsort$$$

module.exports = {
	__heapsort,
	heapsortWith,
	heapsortBy,
	heapsort,
}
