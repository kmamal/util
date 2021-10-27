const { compare } = require('../../function/compare')
const { clone } = require('../clone')
const { map } = require('../map')

const extract = ({ x }) => x

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

const insertionsortBy$$$ = (arr, fnMap) => insertionsortWith$$$(arr, (a, b) => compare(fnMap(a), fnMap(b)))

const insertionsortBy = (arr, fnMap) => insertionsortWith(arr, (a, b) => compare(fnMap(a), fnMap(b)))

insertionsortBy.$$$ = insertionsortBy$$$

const insertionsortByPure$$$ = (arr, fnMap) => {
	if (arr.length <= 1) { return arr }
	map.$$$(arr, (x) => ({ x, value: fnMap(x) }))
	insertionsortWith$$$(arr, (a, b) => compare(a.value, b.value))
	return map.$$$(arr, extract)
}

const insertionsortByPure = (arr, fnMap) => {
	if (arr.length <= 1) { return clone(arr) }
	const res = map(arr, (x) => ({ x, value: fnMap(x) }))
	insertionsortWith$$$(res, (a, b) => compare(a.value, b.value))
	return map.$$$(res, extract)
}

insertionsortByPure.$$$ = insertionsortByPure$$$

const insertionsort$$$ = (arr) => insertionsortWith$$$(arr, compare)

const insertionsort = (arr) => insertionsortWith(arr, compare)

insertionsort.$$$ = insertionsort$$$

module.exports = {
	__insertionsort,
	insertionsortWith,
	insertionsortBy,
	insertionsortByPure,
	insertionsort,
}
