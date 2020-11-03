const { compare } = require('../../function/compare')
const { clone } = require('../clone')
const { map } = require('../map')

const extract = ({ x }) => x

const __insertionsort = (arr, start, sorted_end, end, fn) => {
	for (let i = sorted_end; i < end; i++) {
		const item = arr[i]
		let last_j = i
		for (let j = last_j - 1; j >= start; j--) {
			const current = arr[j]
			if (fn(current, item) <= 0) { break }
			arr[last_j] = current
			last_j = j
		}
		arr[last_j] = item
	}
}

const insertionsortWith$$$ = (arr, fn) => {
	__insertionsort(arr, 0, 1, arr.length, fn)
	return arr
}

const insertionsortWith = (arr, fn) => insertionsortWith$$$(clone(arr), fn)

insertionsortWith.$$$ = insertionsortWith$$$

const insertionsortBy$$$ = (arr, fn) => insertionsortWith$$$(arr, (a, b) => compare(fn(a), fn(b)))

const insertionsortBy = (arr, fn) => insertionsortWith(arr, (a, b) => compare(fn(a), fn(b)))

insertionsortBy.$$$ = insertionsortBy$$$

const insertionsortByPure$$$ = (arr, fn) => {
	map.$$$(arr, (x) => ({ x, value: fn(x) }))
	insertionsortWith$$$(arr, (a, b) => compare(a.value, b.value))
	return map.$$$(arr, extract)
}

const insertionsortByPure = (arr, fn) => {
	const res = map(arr, (x) => ({ x, value: fn(x) }))
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
