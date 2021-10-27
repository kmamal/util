
const __chunk = (dst, dstStart, src, srcStart, srcEnd, chunkSize, chunkNum) => {
	let writeIndex = dstStart
	let readIndex = srcStart
	const dstEnd = dstStart + chunkNum

	while (writeIndex < dstEnd - 1) {
		const chunk = new Array(chunkSize)
		for (let i = 0; i < chunkSize; i++) {
			chunk[i] = src[readIndex++]
		}
		dst[writeIndex++] = chunk
	}

	if (writeIndex < dstEnd) {
		const available = Math.max(0, srcEnd - readIndex)
		const lastChunkSize = Math.min(available, chunkSize)
		const chunk = new Array(lastChunkSize)
		for (let i = 0; i < lastChunkSize; i++) {
			chunk[i] = src[readIndex++]
		}
		dst[writeIndex++] = chunk
	}

	return writeIndex - dstStart
}

const chunk$$$ = (arr, n) => {
	const { length } = arr
	const numChunks = Math.ceil(length / n)
	__chunk(arr, 0, arr, 0, length, n, numChunks)
	arr.length = numChunks
	return arr
}

const chunk = (arr, n) => {
	const { length } = arr
	const numChunks = Math.ceil(length / n)
	const res = new Array(numChunks)
	__chunk(res, 0, arr, 0, length, n, numChunks)
	return res
}

chunk.$$$ = chunk$$$

module.exports = {
	__chunk,
	chunk,
}
