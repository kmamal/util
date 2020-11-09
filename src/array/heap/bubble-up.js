const { getParent } = require('../tree/binary')
const { compare } = require('../../function/compare')

const __bubbleUp = (arr, start, end, _index, fn) => {
	let index = _index
	for (;;) {
		const parent_index = start + getParent(index - start)
		if (parent_index < start) { break }

		const parent = arr[parent_index]
		const value = arr[index]
		if (fn(parent, value) < 0) { break }

		arr[parent_index] = value
		arr[index] = parent
		index = parent_index
	}
}

const bubbleUpWith = (arr, fn) => {
	__bubbleUp(arr, 0, arr.length, fn)
}

const bubbleUpBy = (arr, fn) => bubbleUpWith(arr, (a, b) => compare(fn(a), fn(b)))

const bubbleUp = (arr) => bubbleUpWith(arr, compare)

module.exports = {
	__bubbleUp,
	bubbleUpWith,
	bubbleUpBy,
	bubbleUp,
}
