const { sumBy } = require('./sum')

const __concat = (dst, dstStart, src, srcStart, srcEnd) => {
	let writeIndex = dstStart
	let readIndex = srcStart
	while (readIndex < srcEnd) {
		const arr = src[readIndex++]
		for (let j = 0; j < arr.length; j++) {
			dst[writeIndex++] = arr[j]
		}
	}
	return writeIndex - dstStart
}

const concat = (arrs) => {
	const total = sumBy(arrs, ({ length: n }) => n)
	const res = new Array(total)
	__concat(res, 0, arrs, 0, arrs.length)
	return res
}

module.exports = {
	__concat,
	concat,
}
