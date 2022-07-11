
const __interposeLeft = (dst, dstStart, src, srcStart, srcEnd, value) => {
	const srcLength = srcEnd - srcStart
	if (srcLength === 0) { return }

	let writeIndex = dstStart
	let readIndex = srcStart

	dst[writeIndex++] = src[readIndex++]

	while (readIndex < srcEnd) {
		dst[writeIndex++] = value
		dst[writeIndex++] = src[readIndex++]
	}
}

const __interposeRight = (dst, dstStart, src, srcStart, srcEnd, value) => {
	const srcLength = srcEnd - srcStart
	if (srcLength === 0) { return }

	const dstLength = 2 * srcLength - 1
	let writeIndex = dstStart + dstLength - 1
	let readIndex = srcStart + srcLength - 1

	dst[writeIndex--] = src[readIndex--]

	while (readIndex >= srcStart) {
		dst[writeIndex--] = value
		dst[writeIndex--] = src[readIndex--]
	}
}

const __interpose = (dst, dstStart, src, srcStart, srcEnd, value) => {
	dst === src
		? __interposeRight(dst, dstStart, src, srcStart, srcEnd, value)
		: __interposeLeft(dst, dstStart, src, srcStart, srcEnd, value)
}

const interpose$$$ = (arr, value) => {
	const { length } = arr
	if (length === 0) { return arr }
	__interposeRight(arr, 0, arr, 0, length, value)
	return arr
}

const interpose = (arr, value) => {
	const { length } = arr
	if (length === 0) { return [] }
	const res = new Array(length * 2 - 1)
	__interposeLeft(res, 0, arr, 0, length, value)
	return res
}

interpose.$$$ = interpose$$$

module.exports = {
	__interposeLeft,
	__interposeRight,
	__interpose,
	interpose,
}
