
const __reverse = (dst, dstStart, src, srcStart, srcEnd) => {
	const offset = (srcEnd - srcStart) - 1
	let writeIndexStart = dstStart
	let writeIndexEnd = dstStart + offset
	let readIndexStart = srcStart
	let readIndexEnd = srcStart + offset
	while (readIndexStart < readIndexEnd) {
		const front = src[readIndexStart++]
		const back = src[readIndexEnd--]
		dst[writeIndexStart++] = back
		dst[writeIndexEnd--] = front
	}

	if (readIndexStart === readIndexEnd) {
		dst[writeIndexStart] = src[readIndexStart]
	}
}

const reverse$$$ = (arr) => {
	__reverse(arr, 0, arr, 0, arr.length)
	return arr
}

const reverse = (arr) => {
	const { length } = arr
	const res = new Array(length)
	__reverse(res, 0, arr, 0, length)
	return res
}

reverse.$$$ = reverse$$$

module.exports = {
	__reverse,
	reverse,
}
