
const __split = (dst, dstStart, src, srcStart, srcEnd, fnPred) => {
	let writeIndex = dstStart
	let chunk = []
	let readIndex = srcStart
	while (readIndex < srcEnd) {
		const item = src[readIndex++]
		if (fnPred(item)) {
			dst[writeIndex++] = chunk
			chunk = []
			continue
		}
		chunk.push(item)
	}
	dst[writeIndex++] = chunk

	return writeIndex
}

const splitWith = (arr, fnPred) => {
	const res = []
	__split(res, 0, arr, 0, arr.length, fnPred)
	return res
}

const splitBy = (arr, value, fnMap) => {
	const fnPred = (x) => fnMap(x) === value
	return splitWith(arr, fnPred)
}

const split = (arr, value) => splitWith(arr, (x) => x === value)

module.exports = {
	__split,
	splitWith,
	splitBy,
	split,
}
