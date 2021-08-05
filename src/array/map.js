
const __map = (dst, dstStart, src, srcStart, srcEnd, fn) => {
	let writeIndex = dstStart
	let readIndex = srcStart
	while (readIndex < srcEnd) {
		dst[writeIndex++] = fn(src[readIndex++])
	}
}

const map$$$ = (arr, fn) => {
	__map(arr, 0, arr, 0, arr.length, fn)
	return arr
}

const map = (arr, fn) => {
	const { length } = arr
	const res = new Array(length)
	__map(res, 0, arr, 0, arr.length, fn)
	return res
}

map.$$$ = map$$$

module.exports = {
	__map,
	map,
}
