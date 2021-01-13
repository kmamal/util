
const __linearSearch = (arr, start, end, fn_pred) => {
	for (let i = start; i < end; i++) {
		const item = arr[i]
		if (fn_pred(item)) { return i }
	}
	return -1
}

const __linearSearchRight = (arr, start, end, fn_pred) => {
	for (let i = end - 1; i >= start; i--) {
		const item = arr[i]
		if (fn_pred(item)) { return i }
	}
	return -1
}

module.exports = {
	__linearSearch,
	__linearSearchRight,
}
