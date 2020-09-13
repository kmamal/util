
const __every = (arr, start, end, fn) => {
	for (let i = start; i < end; i++) {
		if (!fn(arr[i])) { return false }
	}
	return true
}

const every = (arr, fn) => __every(arr, 0, arr.length, fn)

module.exports = {
	__every,
	every,
}
