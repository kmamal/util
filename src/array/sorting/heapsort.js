const { __heapify, __pop } = require('../heap')
const { compare, compareBy } = require('../../function/compare')
const { clone } = require('../clone')
const { __copy } = require('../copy')

const __heapsort = (arr, start, end, _fnCmp) => {
	const fnCmp = (a, b) => -_fnCmp(a, b)
	__heapify(arr, start, end, fnCmp)
	for (let i = end; i > start; i--) {
		__pop(arr, start, i, fnCmp)
	}
}


const heapsortWith = (arr, fnCmp) => {
	const res = clone(arr)
	__heapsort(res, 0, arr.length, fnCmp)
	return res
}

const heapsortWithTo = (dst, arr, fnCmp) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__heapsort(dst, 0, length, fnCmp)
	return arr
}

const heapsortWith$$$ = (arr, fnCmp) => {
	__heapsort(arr, 0, arr.length, fnCmp)
	return arr
}

heapsortWith.to = heapsortWithTo
heapsortWith.$$$ = heapsortWith$$$


const heapsortBy = (arr, fnMap) => {
	const res = clone(arr)
	__heapsort(res, 0, arr.length, compareBy(fnMap))
	return res
}

const heapsortByTo = (dst, arr, fnMap) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__heapsort(dst, 0, length, compareBy(fnMap))
	return arr
}

const heapsortBy$$$ = (arr, fnMap) => {
	__heapsort(arr, 0, arr.length, compareBy(fnMap))
	return arr
}

heapsortBy.to = heapsortByTo
heapsortBy.$$$ = heapsortBy$$$


const heapsort = (arr) => {
	const res = clone(arr)
	__heapsort(res, 0, arr.length, compare)
	return res
}

const heapsortTo = (dst, arr) => {
	const { length } = arr
	dst.length = length
	__copy(dst, 0, arr, 0, length)
	__heapsort(dst, 0, length, compare)
	return arr
}

const heapsort$$$ = (arr) => {
	__heapsort(arr, 0, arr.length, compare)
	return arr
}

heapsort.to = heapsortTo
heapsort.$$$ = heapsort$$$


module.exports = {
	__heapsort,
	heapsortWith,
	heapsortBy,
	heapsort,
}
