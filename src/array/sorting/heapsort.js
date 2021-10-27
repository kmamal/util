const { __heapify, __pop } = require('../heap')
const { compare } = require('../../function/compare')
const { clone } = require('../clone')
const { map } = require('../map')

const extract = ({ x }) => x

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

const heapsortBy$$$ = (arr, fnMap) => heapsortWith$$$(arr, (a, b) => compare(fnMap(a), fnMap(b)))

const heapsortBy = (arr, fnMap) => heapsortWith(arr, (a, b) => compare(fnMap(a), fnMap(b)))

heapsortBy.$$$ = heapsortBy$$$

const heapsortByPure$$$ = (arr, fnMap) => {
	if (arr.length <= 1) { return arr }
	map.$$$(arr, (x) => ({ x, value: fnMap(x) }))
	heapsortWith$$$(arr, (a, b) => compare(a.value, b.value))
	return map.$$$(arr, extract)
}

const heapsortByPure = (arr, fnMap) => {
	if (arr.length <= 1) { return clone(arr) }
	const res = map(arr, (x) => ({ x, value: fnMap(x) }))
	heapsortWith$$$(res, (a, b) => compare(a.value, b.value))
	return map.$$$(res, extract)
}

heapsortByPure.$$$ = heapsortByPure$$$

const heapsort$$$ = (arr) => heapsortWith$$$(arr, compare)

const heapsort = (arr) => heapsortWith(arr, compare)

heapsort.$$$ = heapsort$$$

module.exports = {
	__heapsort,
	heapsortWith,
	heapsortBy,
	heapsortByPure,
	heapsort,
}
