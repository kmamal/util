const { __binarySearchLast } = require('../searching/binary')
const { compare, compareBy } = require('../../function/compare')
const { clone } = require('../clone')

const __binsertionsort = (arr, start, sortedEnd, end, fnCmp) => {
	for (let i = sortedEnd; i < end; i++) {
		const item = arr[i]
		const position = __binarySearchLast(arr, start, i, item, fnCmp)
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

const binsertionsortBy$$$ = (arr, fnMap) => binsertionsortWith$$$(arr, compareBy(fnMap))

const binsertionsortBy = (arr, fnMap) => binsertionsortWith(arr, compareBy(fnMap))

binsertionsortBy.$$$ = binsertionsortBy$$$

const binsertionsort$$$ = (arr) => binsertionsortWith$$$(arr, compare)

const binsertionsort = (arr) => binsertionsortWith(arr, compare)

binsertionsort.$$$ = binsertionsort$$$

module.exports = {
	__binsertionsort,
	binsertionsortWith,
	binsertionsortBy,
	binsertionsort,
}
