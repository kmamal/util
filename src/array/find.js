const { __linearSearch, __linearSearchRight } = require('./search/linear')

const findIndex = (arr, fn_pred) => __linearSearch(arr, 0, arr.length, fn_pred)

const findIndexRight = (arr, fn_pred) => __linearSearchRight(arr, 0, arr.length, fn_pred)

const find = (arr, fn_pred) => {
	const { length } = arr
	const index = __linearSearch(arr, 0, length, fn_pred)
	return index === length ? undefined : arr[index]
}

const findRight = (arr, fn_pred) => {
	const index = __linearSearchRight(arr, 0, arr.length, fn_pred)
	return index === -1 ? undefined : arr[index]
}

module.exports = {
	findIndex,
	findIndexRight,
	find,
	findRight,
}
