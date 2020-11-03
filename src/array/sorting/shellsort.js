const { compare } = require('../../function/compare')
const { clone } = require('../clone')
const { map } = require('../map')

const extract = ({ x }) => x

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

const shellsortByPure$$$ = (arr, fn) => {
	map.$$$(arr, (x) => ({ x, value: fn(x) }))
	shellsortWith$$$(arr, (a, b) => compare(a.value, b.value))
	return map.$$$(arr, extract)
}

const shellsortByPure = (arr, fn) => {
	const res = map(arr, (x) => ({ x, value: fn(x) }))
	shellsortWith$$$(res, (a, b) => compare(a.value, b.value))
	return map.$$$(res, extract)
}

shellsortByPure.$$$ = shellsortByPure$$$

const shellsort$$$ = (arr) => shellsortWith$$$(arr, compare)

const shellsort = (arr) => shellsortWith(arr, compare)

shellsort.$$$ = shellsort$$$

module.exports = {
	__shellsort,
	shellsortWith,
	shellsortBy,
	shellsortByPure,
	shellsort,
}
