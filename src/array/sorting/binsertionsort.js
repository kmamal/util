const { __bisectRight } = require('../bisect')
const { compare } = require('../../function/compare')
const { clone } = require('../clone')
const { map } = require('../map')

const extract = ({ x }) => x

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

const binsertionsortByPure$$$ = (arr, fn) => {
	map.$$$(arr, (x) => ({ x, value: fn(x) }))
	binsertionsortWith$$$(arr, (a, b) => compare(a.value, b.value))
	return map.$$$(arr, extract)
}

const binsertionsortByPure = (arr, fn) => {
	const res = map(arr, (x) => ({ x, value: fn(x) }))
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
