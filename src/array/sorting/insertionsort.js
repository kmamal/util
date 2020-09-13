const { compare } = require('../../function/compare')
const { identity } = require('../../function/identity')
const { clone } = require('../clone')

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

const insertionsort$$$ = (arr) => insertionsortBy$$$(arr, identity)

const insertionsort = (arr) => insertionsortBy(arr, identity)

insertionsort.$$$ = insertionsort$$$

module.exports = {
	__insertionsort,
	insertionsortWith,
	insertionsortBy,
	insertionsort,
}
