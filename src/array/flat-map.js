
const __flatMap = (dst, dstStart, src, srcStart, srcEnd, fn) => {
	let writeIndex = dstStart
	let readIndex = srcStart
	while (readIndex < srcEnd) {
		const item = src[readIndex++]
		const mapped = fn(item)
		for (let i = 0; i < mapped.length; i++) {
			dst[writeIndex++] = mapped[i]
		}
	}
	return writeIndex - dstStart
}


const flatMap = (arr, fn) => {
	const res = []
	__flatMap(res, 0, arr, 0, arr.length, fn)
	return res
}

const flatMapTo = (dst, arr, fn) => {
	const n = __flatMap(dst, 0, arr, 0, arr.length, fn)
	dst.lenght = n
	return dst
}

flatMap.to = flatMapTo


module.exports = {
	__flatMap,
	flatMap,
}
