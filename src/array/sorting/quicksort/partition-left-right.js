
const __partitionLeftRight = (arr, start, end, pivot, fn) => {
	let left = start
	for (let i = start; i < end; i++) {
		if (fn(arr[i], pivot) < 0) {
			const tmp = arr[left]
			arr[left] = arr[i]
			arr[i] = tmp
			left += 1
		}
	}

	let right = left
	for (let i = start; i < end; i++) {
		if (fn(arr[i], pivot) === 0) {
			const tmp = arr[right]
			arr[right] = arr[i]
			arr[i] = tmp
			right += 1
		}
	}

	return { left, right }
}

module.exports = { __partitionLeftRight }
