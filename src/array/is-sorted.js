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

// HACK: Depends on knowing the algo internals
const isSortedByPure = (arr, fn) => {
	let aValue = fn(arr[0])
	return isSortedWith(arr, (a, b) => {
		const bValue = fn(b)
		const result = compare(aValue, bValue)
		aValue = bValue
		return result
	})
}

const isSorted = (arr) => isSortedWith(arr, compare)

module.exports = {
	__isSorted,
	isSortedWith,
	isSortedBy,
	isSortedByPure,
	isSorted,
}
