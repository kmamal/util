const { compare } = require('../function/compare')

const __bisect = (arr, start, end, x, fn) => {
	let low = start
	let high = end
	while (low < high) {
		const mid = Math.floor((high - low) / 2) + low
		const item = arr[mid]
		const cmp = fn(x, item)
		if (cmp === 0) { return mid }
		cmp < 0 ? high = mid : low = mid + 1
	}
	return low
}

const __bisectLeft = (arr, start, end, x, fn) => {
	let low = start
	let high = end
	while (low < high) {
		const mid = Math.floor((high - low) / 2) + low
		const item = arr[mid]
		const cmp = fn(x, item)
		cmp <= 0 ? high = mid : low = mid + 1
	}
	return low
}

const __bisectRight = (arr, start, end, x, fn) => {
	let low = start
	let high = end
	while (low < high) {
		const mid = Math.floor((high - low) / 2) + low
		const item = arr[mid]
		const cmp = fn(x, item)
		cmp < 0 ? high = mid : low = mid + 1
	}
	return low
}

const bisectWith = (arr, x, fn) => __bisect(arr, 0, arr.length, x, fn)
const bisectLeftWith = (arr, x, fn) => __bisectLeft(arr, 0, arr.length, x, fn)
const bisectRightWith = (arr, x, fn) => __bisectRight(arr, 0, arr.length, x, fn)

const bisectBy = (arr, x, fn) => bisectWith(arr, x, (a, b) => compare(fn(a), fn(b)))
const bisectLeftBy = (arr, x, fn) => bisectLeftWith(arr, x, (a, b) => compare(fn(a), fn(b)))
const bisectRightBy = (arr, x, fn) => bisectRightWith(arr, x, (a, b) => compare(fn(a), fn(b)))

// HACK: The first argument to compare is always x
const bisectByPure = (arr, x, fn) => {
	const x_value = fn(x)
	return bisectWith(arr, x, (a, b) => compare(x_value, fn(b)))
}
const bisectLeftByPure = (arr, x, fn) => {
	const x_value = fn(x)
	return bisectLeftWith(arr, x, (a, b) => compare(x_value, fn(b)))
}
const bisectRightByPure = (arr, x, fn) => {
	const x_value = fn(x)
	return bisectRightWith(arr, x, (a, b) => compare(x_value, fn(b)))
}

const bisect = (arr, x) => bisectWith(arr, x, compare)
const bisectLeft = (arr, x) => bisectLeftWith(arr, x, compare)
const bisectRight = (arr, x) => bisectRightWith(arr, x, compare)

module.exports = {
	__bisect,
	__bisectLeft,
	__bisectRight,
	bisectWith,
	bisectLeftWith,
	bisectRightWith,
	bisectBy,
	bisectLeftBy,
	bisectRightBy,
	bisectByPure,
	bisectLeftByPure,
	bisectRightByPure,
	bisect,
	bisectLeft,
	bisectRight,
}
