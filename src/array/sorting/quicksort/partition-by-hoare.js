
const __partitionByHoare = (arr, start, end, pivot, fn) => {
	let start_index = start
	let end_index = end - 1
	for (;;) {
		while (start_index < end) {
			const item = arr[start_index]
			if (fn(item, pivot) > 0) { break }
			start_index += 1
		}

		while (end_index > start) {
			const item = arr[end_index]
			if (fn(item, pivot) < 0) { break }
			end_index -= 1
		}

		if (start_index >= end_index) { break }

		const tmp = arr[end_index]
		arr[end_index] = arr[start_index]
		arr[start_index] = tmp
		start_index += 1
		end_index -= 1
	}

	return start_index
}

module.exports = { __partitionByHoare }
