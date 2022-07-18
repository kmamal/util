const { getLeft, getRight } = require('../tree/binary')
const { compare } = require('../../function/compare')

const __bubbleDown = (arr, start, end, _index, fn) => {
	let index = _index
	for (;;) {
		const adjustedIndex = index - start
		const leftChildIndex = start + getLeft(adjustedIndex)
		if (leftChildIndex >= end) { break }
		const leftChild = arr[leftChildIndex]

		const rightChildIndex = start + getRight(adjustedIndex)
		const rightChild = arr[rightChildIndex]

		const isLeft = rightChildIndex >= end || fn(leftChild, rightChild) <= 0
		let minChildIndex
		let minChild
		if (isLeft) {
			minChildIndex = leftChildIndex
			minChild = leftChild
		} else {
			minChildIndex = rightChildIndex
			minChild = rightChild
		}

		const value = arr[index]
		if (fn(value, minChild) < 0) { break }

		arr[minChildIndex] = value
		arr[index] = minChild
		index = minChildIndex
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
