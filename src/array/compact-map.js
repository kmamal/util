
const __compactMap = (dst, dstStart, src, srcStart, srcEnd, fnMap) => {
	let writeIndex = dstStart
	let readIndex = srcStart
	while (readIndex < srcEnd) {
		const item = src[readIndex++]
		const mapped = fnMap(item)
		if (!mapped) { continue }
		dst[writeIndex++] = mapped
	}
	return writeIndex - dstStart
}

const compactMap$$$ = (arr, fnMap) => {
	const n = __compactMap(arr, 0, arr, 0, arr.length, fnMap)
	arr.length = n
	return arr
}

const compactMap = (arr, fnMap) => {
	const res = []
	__compactMap(res, 0, arr, 0, arr.length, fnMap)
	return res
}

compactMap.$$$ = compactMap$$$

module.exports = {
	__compactMap,
	compactMap,
}
