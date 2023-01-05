const { compare } = require('../function/compare')

const __isSorted = (arr, start, end, fn) => {
	let prev = arr[start]
	for (let i = start; i < end; i++) {
		const curr = arr[i]
		if (fn(prev, curr) > 0) { return false }
		prev = curr
	}
	return true
}

const isSortedWith = (arr, fn) => __isSorted(arr, 0, arr.length, fn)

const isSortedBy = (arr, fn) => isSortedWith(arr, (a, b) => compare(fn(a), fn(b)))

const isSorted = (arr) => isSortedWith(arr, compare)

module.exports = {
	__isSorted,
	isSortedWith,
	isSortedBy,
	isSorted,
}
