
const __some = (arr, start, end, fn) => {
	for (let i = start; i < end; i++) {
		if (fn(arr[i])) { return true }
	}
	return false
}

const some = (arr, fn) => __some(arr, 0, arr.length, fn)

module.exports = {
	__some,
	some,
}
