
const __linearSearch = (arr, start, end, fnPred) => {
	for (let i = start; i < end; i++) {
		const item = arr[i]
		if (fnPred(item)) { return i }
	}
	return -1
}

const __linearSearchRight = (arr, start, end, fnPred) => {
	for (let i = end - 1; i >= start; i--) {
		const item = arr[i]
		if (fnPred(item)) { return i }
	}
	return -1
}

module.exports = {
	__linearSearch,
	__linearSearchRight,
}
