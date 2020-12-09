const { compare } = require('../../function/compare')

const __binarySearch = (arr, start, end, x, fn_cmp) => {
	let low = start
	let high = end
	for (;;) {
		const len = high - low
		if (len <= 0) { return low }
		const mid = Math.floor((high + low) / 2)
		const item = arr[mid]
		const cmp = fn_cmp(x, item)
		if (cmp === 0) { return mid }
		cmp < 0 ? high = mid : low = mid + 1
	}
}

const __binarySearchLeft = (arr, start, end, x, fn_cmp) => {
	let low = start
	let high = end
	for (;;) {
		const len = high - low
		if (len <= 0) { return low }
		const mid = Math.floor((high + low) / 2)
		const item = arr[mid]
		const cmp = fn_cmp(x, item)
		cmp <= 0 ? high = mid : low = mid + 1
	}
}

const __binarySearchRight = (arr, start, end, x, fn_cmp) => {
	let low = start
	let high = end
	for (;;) {
		const len = high - low
		if (len <= 0) { return low }
		const mid = Math.floor((high + low) / 2)
		const item = arr[mid]
		const cmp = fn_cmp(x, item)
		cmp < 0 ? high = mid : low = mid + 1
	}
}

const binarySearchWith = (arr, x, fn_cmp) => __binarySearch(arr, 0, arr.length, x, fn_cmp)
const binarySearchLeftWith = (arr, x, fn_cmp) => __binarySearchLeft(arr, 0, arr.length, x, fn_cmp)
const binarySearchRightWith = (arr, x, fn_cmp) => __binarySearchRight(arr, 0, arr.length, x, fn_cmp)

const binarySearchBy = (arr, x, fn_map) => binarySearchWith(arr, x, (a, b) => compare(fn_map(a), fn_map(b)))
const binarySearchLeftBy = (arr, x, fn_map) => binarySearchLeftWith(arr, x, (a, b) => compare(fn_map(a), fn_map(b)))
const binarySearchRightBy = (arr, x, fn_map) => binarySearchRightWith(arr, x, (a, b) => compare(fn_map(a), fn_map(b)))

// HACK: The first argument to compare is always x
const binarySearchByPure = (arr, x, fn_map) => {
	const x_value = fn_map(x)
	return binarySearchWith(arr, x, (a, b) => compare(x_value, fn_map(b)))
}
const binarySearchLeftByPure = (arr, x, fn_map) => {
	const x_value = fn_map(x)
	return binarySearchLeftWith(arr, x, (a, b) => compare(x_value, fn_map(b)))
}
const binarySearchRightByPure = (arr, x, fn_map) => {
	const x_value = fn_map(x)
	return binarySearchRightWith(arr, x, (a, b) => compare(x_value, fn_map(b)))
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
