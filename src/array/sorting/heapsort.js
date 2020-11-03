const { __heapify, __pop } = require('../heap')
const { compare } = require('../../function/compare')
const { clone } = require('../clone')
const { map } = require('../map')

const extract = ({ x }) => x

const __heapsort = (arr, start, end, _fn) => {
	const fn = (a, b) => -_fn(a, b)
	__heapify(arr, start, end, fn)
	for (let i = end; i > start; i--) {
		__pop(arr, start, i, fn)
	}
}

const heapsortWith$$$ = (arr, fn) => {
	__heapsort(arr, 0, arr.length, fn)
	return arr
}

const heapsortWith = (arr, fn) => heapsortWith$$$(clone(arr), fn)

heapsortWith.$$$ = heapsortWith$$$

const heapsortBy$$$ = (arr, fn) => heapsortWith$$$(arr, (a, b) => compare(fn(a), fn(b)))

const heapsortBy = (arr, fn) => heapsortWith(arr, (a, b) => compare(fn(a), fn(b)))

heapsortBy.$$$ = heapsortBy$$$

const heapsortByPure$$$ = (arr, fn) => {
	map.$$$(arr, (x) => ({ x, value: fn(x) }))
	heapsortWith$$$(arr, (a, b) => compare(a.value, b.value))
	return map.$$$(arr, extract)
}

const heapsortByPure = (arr, fn) => {
	const res = map(arr, (x) => ({ x, value: fn(x) }))
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
