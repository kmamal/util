const { compare } = require('../function/compare')
const { identity } = require('../function/identity')

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

const bisect = (arr, x) => bisectBy(arr, x, identity)
const bisectLeft = (arr, x) => bisectLeftBy(arr, x, identity)
const bisectRight = (arr, x) => bisectRightBy(arr, x, identity)

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
	bisect,
	bisectLeft,
	bisectRight,
}
