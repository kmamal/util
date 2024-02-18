
const __partitionByHoare = (arr, start, end, pivot, fnCmp) => {
	let startIndex = start
	let endIndex = end - 1
	for (;;) {
		for (; startIndex < end; startIndex++) {
			const item = arr[startIndex]
			if (fnCmp(item, pivot) > 0) { break }
		}

		for (; endIndex > start; endIndex--) {
			const item = arr[endIndex]
			if (fnCmp(item, pivot) < 0) { break }
		}

		if (startIndex >= endIndex) { break }

		const tmp = arr[endIndex]
		arr[endIndex] = arr[startIndex]
		arr[startIndex] = tmp
		startIndex += 1
		endIndex -= 1
	}

	return startIndex
}

module.exports = { __partitionByHoare }
