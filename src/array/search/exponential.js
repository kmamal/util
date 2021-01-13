const { compare } = require('../../function/compare')

const __initExponentialSearch = (start, end) => {
	const low = start
	const high = null
	const last = end - 1
	return { start, last, low, high }
}

const __expandExponentialSearch = (state, cmp) => {
	const { low, start, last } = state
	if (cmp < 0) {
		if (low === start) { return true }
		state.high = low + 1
		state.low /= 2
		state.mid = Math.floor((state.high + state.low) / 2)
		return true
	}
	if (low === last) {
		state.low++
		return true
	}
	state.low = Math.max(1, Math.min(last, low * 2))
	return false
}

const __contractExponentialSearch = (state, cmp) => {
	const { low, high, mid } = state
	if (cmp < 0) {
		state.high = mid
	} else {
		state.low = mid + 1
	}
	if (state.high <= state.low) { return true }
	state.mid = Math.floor((high + low) / 2)
	return false
}

const __exponentialSearch = (arr, start, end, x, fn_cmp) => {
	const state = __initExponentialSearch(start, end)
	if (state.last < start) { return 0 }

	for (;;) {
		const value = arr[state.low]
		const cmp = fn_cmp(x, value)
		if (cmp === 0) { return state.low }
		const done = __expandExponentialSearch(state, cmp)
		if (done) {
			if (state.high === null) { return state.low }
			break
		}
	}

	for (;;) {
		const value = arr[state.mid]
		const cmp = fn_cmp(x, value)
		if (cmp === 0) { return state.mid }
		const done = __contractExponentialSearch(state, cmp)
		if (done) { return state.low }
	}
}

const __exponentialSearch2 = (arr, start, end, x, fn_cmp) => {
	const last = end - 1
	if (last < start) { return 0 }

	let low = start
	let high = null
	let mid

	for (;;) {
		const value = arr[low]
		const cmp = fn_cmp(x, value)
		if (cmp === 0) { return low }
		if (cmp < 0) {
			if (low === start) { return low }
			high = low + 1
			low /= 2
			mid = Math.floor((high + low) / 2)
			break
		}
		if (low === last) { return low + 1 }
		low = Math.max(1, Math.min(last, low * 2))
	}

	for (;;) {
		const value = arr[mid]
		const cmp = fn_cmp(x, value)
		if (cmp === 0) { return mid }
		if (cmp < 0) {
			high = mid
		} else {
			low = mid + 1
		}
		if (high <= low) { return low }
		mid = Math.floor((high + low) / 2)
	}
}

const __exponentialSearchLeft = (arr, start, end, x, fn_cmp) => {
	const state = __initExponentialSearch(start, end)
	if (state.last === -1) { return 0 }

	for (;;) {
		const value = arr[state.low]
		const cmp = fn_cmp(x, value)
		const done = __expandExponentialSearch(state, cmp || -1)
		if (done) {
			if (state.high === null) { return state.low }
			break
		}
	}

	for (;;) {
		const value = arr[state.mid]
		const cmp = fn_cmp(x, value)
		const done = __contractExponentialSearch(state, cmp || -1)
		if (done) { return state.low }
	}
}

const __exponentialSearchRight = (arr, start, end, x, fn_cmp) => {
	const state = __initExponentialSearch(start, end)
	if (state.last === -1) { return 0 }

	for (;;) {
		const value = arr[state.low]
		const cmp = fn_cmp(x, value)
		const done = __expandExponentialSearch(state, cmp || 1)
		if (done) {
			if (state.high === null) { return state.low }
			break
		}
	}

	for (;;) {
		const value = arr[state.mid]
		const cmp = fn_cmp(x, value)
		const done = __contractExponentialSearch(state, cmp || 1)
		if (done) { return state.low }
	}
}

const exponentialSearchWith = (arr, x, fn_cmp) => __exponentialSearch(arr, 0, arr.length, x, fn_cmp)
const exponentialSearchLeftWith = (arr, x, fn_cmp) => __exponentialSearchLeft(arr, 0, arr.length, x, fn_cmp)
const exponentialSearchRightWith = (arr, x, fn_cmp) => __exponentialSearchRight(arr, 0, arr.length, x, fn_cmp)

const exponentialSearchBy = (arr, x, fn_map) => {
	const fn_cmp = (a, b) => compare(fn_map(a), fn_map(b))
	return exponentialSearchWith(arr, x, fn_cmp)
}
const exponentialSearchLeftBy = (arr, x, fn_map) => {
	const fn_cmp = (a, b) => compare(fn_map(a), fn_map(b))
	return exponentialSearchLeftWith(arr, x, fn_cmp)
}
const exponentialSearchRightBy = (arr, x, fn_map) => {
	const fn_cmp = (a, b) => compare(fn_map(a), fn_map(b))
	return exponentialSearchRightWith(arr, x, fn_cmp)
}

const exponentialSearchByPure = (arr, x, fn_map) => {
	const x_value = fn_map(x)
	return exponentialSearchWith(arr, x, (a, b) => compare(x_value, fn_map(b)))
}
const exponentialSearchLeftByPure = (arr, x, fn_map) => {
	const x_value = fn_map(x)
	return exponentialSearchLeftWith(arr, x, (a, b) => compare(x_value, fn_map(b)))
}
const exponentialSearchRightByPure = (arr, x, fn_map) => {
	const x_value = fn_map(x)
	return exponentialSearchRightWith(arr, x, (a, b) => compare(x_value, fn_map(b)))
}

const exponentialSearch = (arr, x) => exponentialSearchWith(arr, x, compare)
const exponentialSearchLeft = (arr, x) => exponentialSearchLeftWith(arr, x, compare)
const exponentialSearchRight = (arr, x) => exponentialSearchRightWith(arr, x, compare)

module.exports = {
	__initExponentialSearch,
	__expandExponentialSearch,
	__contractExponentialSearch,
	__exponentialSearch,
	__exponentialSearchLeft,
	__exponentialSearchRight,
	exponentialSearchWith,
	exponentialSearchLeftWith,
	exponentialSearchRightWith,
	exponentialSearchBy,
	exponentialSearchLeftBy,
	exponentialSearchRightBy,
	exponentialSearchByPure,
	exponentialSearchLeftByPure,
	exponentialSearchRightByPure,
	exponentialSearch,
	exponentialSearchLeft,
	exponentialSearchRight,
}
