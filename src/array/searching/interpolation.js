const { sub } = require('../../operators/arithmetic/sub')

const __interpolationSearch = (arr, start, end, x, fnDist) => {
	let low = start
	let high = end
	let lowValue = arr[low]
	let highValue = arr[high - 1]

	let lowDist = fnDist(x, lowValue)
	if (lowDist <= 0) { return low }

	let highDist = -fnDist(x, highValue)
	if (highDist === 0) { return high - 1 }
	if (highDist < 0) { return high }

	while (low < high) {
		const range = highDist + lowDist
		if (range === 0) { return low }

		const ratio = lowDist / range
		const mid = Math.floor((high - low) * ratio) + low
		const midValue = arr[mid]
		const dist = fnDist(x, midValue)
		if (dist === 0) { return mid }
		if (dist < 0) {
			high = mid
			highValue = midValue
			highDist = -dist
		} else {
			low = mid + 1
			lowValue = midValue
			lowDist = dist
		}
	}
	return low
}

const __interpolationSearchLeft = (arr, start, end, x, fnDist) => {
	let low = start
	let high = end
	let lowValue = arr[low]
	let highValue = arr[high - 1]

	let lowDist = fnDist(x, lowValue)
	if (lowDist <= 0) { return low }

	let highDist = -fnDist(x, highValue)
	if (highDist < 0) { return high }

	while (low < high) {
		const range = highDist + lowDist
		if (range === 0) { return low }

		const ratio = lowDist / range
		const mid = Math.floor((high - low - 1) * ratio) + low
		const midValue = arr[mid]
		const dist = fnDist(x, midValue)
		if (dist <= 0) {
			high = mid
			highValue = midValue
			highDist = -dist
		} else {
			low = mid + 1
			lowValue = midValue
			lowDist = dist
		}
	}
	return low
}

const __interpolationSearchRight = (arr, start, end, x, fnDist) => {
	let low = start
	let high = end
	let lowValue = arr[low]
	let highValue = arr[high - 1]

	let lowDist = fnDist(x, lowValue)
	if (lowDist < 0) { return low }

	let highDist = -fnDist(x, highValue)
	if (highDist <= 0) { return high }

	while (low < high) {
		const range = highDist + lowDist
		if (range === 0) { return high }

		const ratio = lowDist / range
		const mid = Math.floor((high - low - 1) * ratio) + low
		const midValue = arr[mid]
		const dist = fnDist(x, midValue)
		if (dist < 0) {
			high = mid
			highValue = midValue
			highDist = -dist
		} else {
			low = mid + 1
			lowValue = midValue
			lowDist = dist
		}
	}
	return low
}

const interpolationSearchWith = (arr, x, fnDist) => __interpolationSearch(arr, 0, arr.length, x, fnDist)
const interpolationSearchLeftWith = (arr, x, fnDist) => __interpolationSearchLeft(arr, 0, arr.length, x, fnDist)
const interpolationSearchRightWith = (arr, x, fnDist) => __interpolationSearchRight(arr, 0, arr.length, x, fnDist)

const interpolationSearchBy = (arr, x, fnMap) => interpolationSearchWith(arr, x, (a, b) => sub(fnMap(a), fnMap(b)))
const interpolationSearchLeftBy = (arr, x, fnMap) => interpolationSearchLeftWith(arr, x, (a, b) => sub(fnMap(a), fnMap(b)))
const interpolationSearchRightBy = (arr, x, fnMap) => interpolationSearchRightWith(arr, x, (a, b) => sub(fnMap(a), fnMap(b)))

// HACK: The first argument to dist is always x
const interpolationSearchByPure = (arr, x, fnMap) => {
	const xValue = fnMap(x)
	return interpolationSearchWith(arr, x, (a, b) => sub(xValue, fnMap(b)))
}
const interpolationSearchLeftByPure = (arr, x, fnMap) => {
	const xValue = fnMap(x)
	return interpolationSearchLeftWith(arr, x, (a, b) => sub(xValue, fnMap(b)))
}
const interpolationSearchRightByPure = (arr, x, fnMap) => {
	const xValue = fnMap(x)
	return interpolationSearchRightWith(arr, x, (a, b) => sub(xValue, fnMap(b)))
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
