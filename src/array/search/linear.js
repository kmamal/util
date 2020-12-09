
const __linearSearch = (arr, start, end, fn_pred) => {
	let index = start
	while (index < end) {
		const item = arr[index]
		if (fn_pred(item)) { break }
		index++
	}
	return index
}

const __linearSearchRight = (arr, start, end, fn_pred) => {
	let index = end - 1
	while (index >= start) {
		const item = arr[index]
		if (fn_pred(item)) { break }
		index--
	}
	return index
}

module.exports = {
	__linearSearch,
	__linearSearchRight,
}
