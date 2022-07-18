
const __filter = (dst, dstStart, src, srcStart, srcEnd, fnPred) => {
	let writeIndex = dstStart
	let readIndex = srcStart
	while (readIndex < srcEnd) {
		const item = src[readIndex++]
		const keep = fnPred(item)
		if (!keep) { continue }
		dst[writeIndex++] = item
	}
	return writeIndex - dstStart
}

const filter$$$ = (arr, fnPred) => {
	const n = __filter(arr, 0, arr, 0, arr.length, fnPred)
	arr.length = n
	return arr
}

const filter = (arr, fnPred) => {
	const res = []
	__filter(res, 0, arr, 0, arr.length, fnPred)
	return res
}

filter.$$$ = filter$$$

module.exports = {
	__filter,
	filter,
}
