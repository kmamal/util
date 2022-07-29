const { compare } = require('../../function/compare')

const __binarySearch = (arr, start, end, x, fnCmp) => {
	let low = start
	let high = end
	for (;;) {
		if (high <= low) { return low }
		const mid = Math.floor((high + low) / 2)
		const value = arr[mid]
		const cmp = fnCmp(x, value)
		if (cmp === 0) { return mid }
		cmp < 0 ? high = mid : low = mid + 1
	}
}

const __binarySearchLeft = (arr, start, end, x, fnCmp) => {
	let low = start
	let high = end
	for (;;) {
		if (high <= low) { return low }
		const mid = Math.floor((high + low) / 2)
		const value = arr[mid]
		const cmp = fnCmp(x, value)
		cmp <= 0 ? high = mid : low = mid + 1
	}
}

const __binarySearchRight = (arr, start, end, x, fnCmp) => {
	let low = start
	let high = end
	for (;;) {
		if (high <= low) { return low }
		const mid = Math.floor((high + low) / 2)
		const value = arr[mid]
		const cmp = fnCmp(x, value)
		cmp < 0 ? high = mid : low = mid + 1
	}
}

const binarySearchWith = (arr, x, fnCmp) => __binarySearch(arr, 0, arr.length, x, fnCmp)
const binarySearchLeftWith = (arr, x, fnCmp) => __binarySearchLeft(arr, 0, arr.length, x, fnCmp)
const binarySearchRightWith = (arr, x, fnCmp) => __binarySearchRight(arr, 0, arr.length, x, fnCmp)

const binarySearchBy = (arr, x, fnMap) => binarySearchWith(arr, x, (a, b) => compare(fnMap(a), fnMap(b)))
const binarySearchLeftBy = (arr, x, fnMap) => binarySearchLeftWith(arr, x, (a, b) => compare(fnMap(a), fnMap(b)))
const binarySearchRightBy = (arr, x, fnMap) => binarySearchRightWith(arr, x, (a, b) => compare(fnMap(a), fnMap(b)))

// HACK: The first argument to compare is always x
const binarySearchByPure = (arr, x, fnMap) => {
	const xValue = fnMap(x)
	return binarySearchWith(arr, x, (a, b) => compare(xValue, fnMap(b)))
}
const binarySearchLeftByPure = (arr, x, fnMap) => {
	const xValue = fnMap(x)
	return binarySearchLeftWith(arr, x, (a, b) => compare(xValue, fnMap(b)))
}
const binarySearchRightByPure = (arr, x, fnMap) => {
	const xValue = fnMap(x)
	return binarySearchRightWith(arr, x, (a, b) => compare(xValue, fnMap(b)))
}

const binarySearch = (arr, x) => binarySearchWith(arr, x, compare)
const binarySearchLeft = (arr, x) => binarySearchLeftWith(arr, x, compare)
const binarySearchRight = (arr, x) => binarySearchRightWith(arr, x, compare)

module.exports = {
	__binarySearch,
	__binarySearchLeft,
	__binarySearchRight,
	binarySearchWith,
	binarySearchLeftWith,
	binarySearchRightWith,
	binarySearchBy,
	binarySearchLeftBy,
	binarySearchRightBy,
	binarySearchByPure,
	binarySearchLeftByPure,
	binarySearchRightByPure,
	binarySearch,
	binarySearchLeft,
	binarySearchRight,
}
