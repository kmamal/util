const { __binarySearchRight } = require('../searching/binary')
const { compare } = require('../../function/compare')
const { clone } = require('../clone')
const { map } = require('../map')

const extract = ({ x }) => x

const __binsertionsort = (arr, start, sortedEnd, end, fnCmp) => {
	for (let i = sortedEnd; i < end; i++) {
		const item = arr[i]
		const position = __binarySearchRight(arr, start, i, item, fnCmp)
		for (let j = i; j > position; j--) {
			arr[j] = arr[j - 1]
		}
		arr[position] = item
	}
}

const binsertionsortWith$$$ = (arr, fnCmp) => {
	if (arr.length > 1) {
		__binsertionsort(arr, 0, 1, arr.length, fnCmp)
	}
	return arr
}

const binsertionsortWith = (arr, fnCmp) => binsertionsortWith$$$(clone(arr), fnCmp)

binsertionsortWith.$$$ = binsertionsortWith$$$

const binsertionsortBy$$$ = (arr, fnMap) => binsertionsortWith$$$(arr, (a, b) => compare(fnMap(a), fnMap(b)))

const binsertionsortBy = (arr, fnMap) => binsertionsortWith(arr, (a, b) => compare(fnMap(a), fnMap(b)))

binsertionsortBy.$$$ = binsertionsortBy$$$

const binsertionsortByPure$$$ = (arr, fnMap) => {
	if (arr.length <= 1) { return arr }
	map.$$$(arr, (x) => ({ x, value: fnMap(x) }))
	binsertionsortWith$$$(arr, (a, b) => compare(a.value, b.value))
	return map.$$$(arr, extract)
}

const binsertionsortByPure = (arr, fnMap) => {
	if (arr.length <= 1) { return clone(arr) }
	const res = map(arr, (x) => ({ x, value: fnMap(x) }))
	binsertionsortWith$$$(res, (a, b) => compare(a.value, b.value))
	return map.$$$(res, extract)
}

binsertionsortByPure.$$$ = binsertionsortByPure$$$

const binsertionsort$$$ = (arr) => binsertionsortWith$$$(arr, compare)

const binsertionsort = (arr) => binsertionsortWith(arr, compare)

binsertionsort.$$$ = binsertionsort$$$

module.exports = {
	__binsertionsort,
	binsertionsortWith,
	binsertionsortBy,
	binsertionsortByPure,
	binsertionsort,
}
