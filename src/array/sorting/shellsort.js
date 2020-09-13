const { compare } = require('../../function/compare')
const { identity } = require('../../function/identity')
const { clone } = require('../clone')

// Marcin Ciura's gap sequence
const GAPS = [ 1750, 701, 301, 132, 57, 23, 10, 4, 1 ]

const __shellsort = (arr, start, sorted_end, end, fn) => {
	for (let g = 0; g < GAPS.length; g++) {
		const gap = GAPS[g]

		for (let i = sorted_end + gap - 1; i < end; i++) {
			const item = arr[i]
			let last_j = i
			let j = last_j - gap
			while (j >= start) {
				const current = arr[j]
				if (fn(current, item) <= 0) { break }
				arr[last_j] = current
				last_j = j
				j -= gap
			}
			arr[last_j] = item
		}
	}
}

const shellsortWith$$$ = (arr, fn) => {
	__shellsort(arr, 0, 1, arr.length, fn)
	return arr
}

const shellsortWith = (arr, fn) => shellsortWith$$$(clone(arr), fn)

shellsortWith.$$$ = shellsortWith$$$

const shellsortBy$$$ = (arr, fn) => shellsortWith$$$(arr, (a, b) => compare(fn(a), fn(b)))

const shellsortBy = (arr, fn) => shellsortWith(arr, (a, b) => compare(fn(a), fn(b)))

shellsortBy.$$$ = shellsortBy$$$

const shellsort$$$ = (arr) => shellsortBy$$$(arr, identity)

const shellsort = (arr) => shellsortBy(arr, identity)

shellsort.$$$ = shellsort$$$

module.exports = {
	__shellsort,
	shellsortWith,
	shellsortBy,
	shellsort,
}
