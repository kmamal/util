const { sub } = require('../../operators/arithmetic/sub')

const __interpolationSearch = (arr, start, end, x, fn_dist) => {
	let low = start
	let high = end
	let low_value = arr[low]
	let high_value = arr[high - 1]

	let low_dist = fn_dist(x, low_value)
	if (low_dist <= 0) { return low }

	let high_dist = -fn_dist(x, high_value)
	if (high_dist === 0) { return high - 1 }
	if (high_dist < 0) { return high }

	while (low < high) {
		const range = high_dist + low_dist
		if (range === 0) { return low }

		const ratio = low_dist / range
		const mid = Math.floor((high - low) * ratio) + low
		const mid_value = arr[mid]
		const dist = fn_dist(x, mid_value)
		if (dist === 0) { return mid }
		if (dist < 0) {
			high = mid
			high_value = mid_value
			high_dist = -dist
		} else {
			low = mid + 1
			low_value = mid_value
			low_dist = dist
		}
	}
	return low
}

const __interpolationSearchLeft = (arr, start, end, x, fn_dist) => {
	let low = start
	let high = end
	let low_value = arr[low]
	let high_value = arr[high - 1]

	let low_dist = fn_dist(x, low_value)
	if (low_dist <= 0) { return low }

	let high_dist = -fn_dist(x, high_value)
	if (high_dist < 0) { return high }

	while (low < high) {
		const range = high_dist + low_dist
		if (range === 0) { return low }

		const ratio = low_dist / range
		const mid = Math.floor((high - low - 1) * ratio) + low
		const mid_value = arr[mid]
		const dist = fn_dist(x, mid_value)
		if (dist <= 0) {
			high = mid
			high_value = mid_value
			high_dist = -dist
		} else {
			low = mid + 1
			low_value = mid_value
			low_dist = dist
		}
	}
	return low
}

const __interpolationSearchRight = (arr, start, end, x, fn_dist) => {
	let low = start
	let high = end
	let low_value = arr[low]
	let high_value = arr[high - 1]

	let low_dist = fn_dist(x, low_value)
	if (low_dist < 0) { return low }

	let high_dist = -fn_dist(x, high_value)
	if (high_dist <= 0) { return high }

	while (low < high) {
		const range = high_dist + low_dist
		if (range === 0) { return high }

		const ratio = low_dist / range
		const mid = Math.floor((high - low - 1) * ratio) + low
		const mid_value = arr[mid]
		const dist = fn_dist(x, mid_value)
		if (dist < 0) {
			high = mid
			high_value = mid_value
			high_dist = -dist
		} else {
			low = mid + 1
			low_value = mid_value
			low_dist = dist
		}
	}
	return low
}

const interpolationSearchWith = (arr, x, fn_dist) => __interpolationSearch(arr, 0, arr.length, x, fn_dist)
const interpolationSearchLeftWith = (arr, x, fn_dist) => __interpolationSearchLeft(arr, 0, arr.length, x, fn_dist)
const interpolationSearchRightWith = (arr, x, fn_dist) => __interpolationSearchRight(arr, 0, arr.length, x, fn_dist)

const interpolationSearchBy = (arr, x, fn_map) => interpolationSearchWith(arr, x, (a, b) => sub(fn_map(a), fn_map(b)))
const interpolationSearchLeftBy = (arr, x, fn_map) => interpolationSearchLeftWith(arr, x, (a, b) => sub(fn_map(a), fn_map(b)))
const interpolationSearchRightBy = (arr, x, fn_map) => interpolationSearchRightWith(arr, x, (a, b) => sub(fn_map(a), fn_map(b)))

// HACK: The first argument to dist is always x
const interpolationSearchByPure = (arr, x, fn_map) => {
	const x_value = fn_map(x)
	return interpolationSearchWith(arr, x, (a, b) => sub(x_value, fn_map(b)))
}
const interpolationSearchLeftByPure = (arr, x, fn_map) => {
	const x_value = fn_map(x)
	return interpolationSearchLeftWith(arr, x, (a, b) => sub(x_value, fn_map(b)))
}
const interpolationSearchRightByPure = (arr, x, fn_map) => {
	const x_value = fn_map(x)
	return interpolationSearchRightWith(arr, x, (a, b) => sub(x_value, fn_map(b)))
}

const interpolationSearch = (arr, x) => interpolationSearchWith(arr, x, sub)
const interpolationSearchLeft = (arr, x) => interpolationSearchLeftWith(arr, x, sub)
const interpolationSearchRight = (arr, x) => interpolationSearchRightWith(arr, x, sub)

module.exports = {
	__interpolationSearch,
	__interpolationSearchLeft,
	__interpolationSearchRight,
	interpolationSearchWith,
	interpolationSearchLeftWith,
	interpolationSearchRightWith,
	interpolationSearchBy,
	interpolationSearchLeftBy,
	interpolationSearchRightBy,
	interpolationSearchByPure,
	interpolationSearchLeftByPure,
	interpolationSearchRightByPure,
	interpolationSearch,
	interpolationSearchLeft,
	interpolationSearchRight,
}
