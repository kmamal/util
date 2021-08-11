const { clone } = require('./clone')

const __swap = (arr, aIndex, bIndex) => {
	if (aIndex === bIndex) { return }
	const tmp = arr[aIndex]
	arr[aIndex] = arr[bIndex]
	arr[bIndex] = tmp
}

const swap$$$ = (arr, aIndex, bIndex) => {
	__swap(arr, aIndex, bIndex)
	return arr
}

const swap = (arr, aIndex, bIndex) => {
	const res = clone(arr)
	__swap(res, aIndex, bIndex)
	return res
}

swap.$$$ = swap$$$

module.exports = {
	__swap,
	swap,
}
