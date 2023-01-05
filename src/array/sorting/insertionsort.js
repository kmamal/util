const { compare, compareBy } = require('../../function/compare')
const { clone } = require('../clone')

const __insertionsort = (arr, start, sortedEnd, end, fnCmp) => {
	for (let i = sortedEnd; i < end; i++) {
		const item = arr[i]
		let lastJ = i
		for (let j = lastJ - 1; j >= start; j--) {
			const current = arr[j]
			if (fnCmp(current, item) <= 0) { break }
			arr[lastJ] = current
			lastJ = j
		}
		arr[lastJ] = item
	}
}

const insertionsortWith$$$ = (arr, fnCmp) => {
	if (arr.length > 1) {
		__insertionsort(arr, 0, 1, arr.length, fnCmp)
	}
	return arr
}

const insertionsortWith = (arr, fnCmp) => insertionsortWith$$$(clone(arr), fnCmp)

insertionsortWith.$$$ = insertionsortWith$$$

const insertionsortBy$$$ = (arr, fnMap) => insertionsortWith$$$(arr, compareBy(fnMap))

const insertionsortBy = (arr, fnMap) => insertionsortWith(arr, compareBy(fnMap))

insertionsortBy.$$$ = insertionsortBy$$$

const insertionsort$$$ = (arr) => insertionsortWith$$$(arr, compare)

const insertionsort = (arr) => insertionsortWith(arr, compare)

insertionsort.$$$ = insertionsort$$$

module.exports = {
	__insertionsort,
	insertionsortWith,
	insertionsortBy,
	insertionsort,
}
