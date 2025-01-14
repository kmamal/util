
const __forEach = (arr, start, end, fn) => {
	for (let i = start; i < end; i++) {
		fn(arr[i])
	}
}

const __forEachIndexed = (arr, start, end, fn) => {
	for (let i = start; i < end; i++) {
		fn(arr[i], i)
	}
}


const forEach = (arr, fn) => {
	__forEach(arr, 0, arr.length, fn)
	return arr
}

const forEachIndexed = (arr, fn) => {
	__forEachIndexed(arr, 0, arr.length, fn)
	return arr
}


module.exports = {
	__forEach,
	__forEachIndexed,
	forEach,
	forEachIndexed,
}
