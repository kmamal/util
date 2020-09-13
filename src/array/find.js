
const __find = (arr, start, end, fn) => {
	for (let i = start; i < end; i++) {
		const item = arr[i]
		const match = fn(item)
		if (match) { return i }
	}
	return -1
}

const __findRight = (arr, start, end, fn) => {
	for (let i = end - 1; i >= start; i--) {
		const item = arr[i]
		const match = fn(item)
		if (match) { return i }
	}
	return -1
}

const findIndex = (arr, fn) => __find(arr, 0, arr.length, fn)

const findIndexRight = (arr, fn) => __findRight(arr, 0, arr.length, fn)

const find = (arr, fn) => {
	const index = __find(arr, 0, arr.length, fn)
	return index === -1 ? undefined : arr[index]
}

const findRight = (arr, fn) => {
	const index = __findRight(arr, 0, arr.length, fn)
	return index === -1 ? undefined : arr[index]
}

module.exports = {
	__find,
	__findRight,
	findIndex,
	findIndexRight,
	find,
	findRight,
}
