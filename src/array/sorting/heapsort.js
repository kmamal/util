const { __heapify, __pop } = require('../heap')
const { compare } = require('../../function/compare')
const { identity } = require('../../function/identity')
const { clone } = require('../clone')

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

const heapsort$$$ = (arr) => heapsortBy$$$(arr, identity)

const heapsort = (arr) => heapsortBy(arr, identity)

heapsort.$$$ = heapsort$$$

module.exports = {
	__heapsort,
	heapsortWith,
	heapsortBy,
	heapsort,
}
