const { __bisectRight } = require('../bisect')
const { compare } = require('../../function/compare')
const { identity } = require('../../function/identity')
const { clone } = require('../clone')

const __binsertionsort = (arr, start, sorted_end, end, fn) => {
	for (let i = sorted_end; i < end; i++) {
		const item = arr[i]
		const position = __bisectRight(arr, start, i, item, fn)
		for (let j = i; j > position; j--) {
			arr[j] = arr[j - 1]
		}
		arr[position] = item
	}
}

const binsertionsortWith$$$ = (arr, fn) => {
	__binsertionsort(arr, 0, 1, arr.length, fn)
	return arr
}

const binsertionsortWith = (arr, fn) => binsertionsortWith$$$(clone(arr), fn)

binsertionsortWith.$$$ = binsertionsortWith$$$

const binsertionsortBy$$$ = (arr, fn) => binsertionsortWith$$$(arr, (a, b) => compare(fn(a), fn(b)))

const binsertionsortBy = (arr, fn) => binsertionsortWith(arr, (a, b) => compare(fn(a), fn(b)))

binsertionsortBy.$$$ = binsertionsortBy$$$

const binsertionsort$$$ = (arr) => binsertionsortBy$$$(arr, identity)

const binsertionsort = (arr) => binsertionsortBy(arr, identity)

binsertionsort.$$$ = binsertionsort$$$

module.exports = {
	__binsertionsort,
	binsertionsortWith,
	binsertionsortBy,
	binsertionsort,
}
