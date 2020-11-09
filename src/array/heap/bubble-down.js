const { getLeft, getRight } = require('../tree/binary')
const { compare } = require('../../function/compare')

const __bubbleDown = (arr, start, end, _index, fn) => {
	let index = _index
	for (;;) {
		const adjusted_index = index - start
		const left_child_index = start + getLeft(adjusted_index)
		if (left_child_index >= end) { break }
		const left_child = arr[left_child_index]

		const right_child_index = start + getRight(adjusted_index)
		const right_child = arr[right_child_index]

		const is_left = right_child_index >= end || fn(left_child, right_child) <= 0
		let min_child_index
		let min_child
		if (is_left) {
			min_child_index = left_child_index
			min_child = left_child
		} else {
			min_child_index = right_child_index
			min_child = right_child
		}

		const value = arr[index]
		if (fn(value, min_child) < 0) { break }

		arr[min_child_index] = value
		arr[index] = min_child
		index = min_child_index
	}
}

const bubbleDownWith = (arr, fn) => {
	__bubbleDown(arr, 0, arr.length, fn)
}

const bubbleDownBy = (arr, fn) => bubbleDownWith(arr, (a, b) => compare(fn(a), fn(b)))

const bubbleDown = (arr) => bubbleDownWith(arr, compare)

module.exports = {
	__bubbleDown,
	bubbleDownWith,
	bubbleDownBy,
	bubbleDown,
}
