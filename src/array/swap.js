const { clone } = require('./clone')

const __swap = (arr, a_index, b_index) => {
	const tmp = arr[a_index]
	arr[a_index] = arr[b_index]
	arr[b_index] = tmp
}

const swap$$$ = (arr, a_index, b_index) => {
	__swap(arr, a_index, b_index)
	return arr
}

const swap = (arr, a_index, b_index) => {
	const res = clone(arr)
	__swap(res, a_index, b_index)
	return res
}

swap.$$$ = swap$$$

module.exports = {
	__swap,
	swap,
}
