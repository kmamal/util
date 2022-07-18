
const __join = (dst, dstStart, a, aStart, aEnd, b, bStart, bEnd) => {
	let writeIndex = dstStart
	let aIndex = aStart

	if (aIndex === aEnd) { return }
	{
		const aItem = a[aIndex++]
		dst[writeIndex++] = aItem
	}

	while (aIndex < aEnd) {
		let bIndex = bStart
		while (bIndex < bEnd) {
			const bItem = b[bIndex++]
			dst[writeIndex++] = bItem
		}
		const aItem = a[aIndex++]
		dst[writeIndex++] = aItem
	}
}

const join = (arr, sep) => {
	const { length: arrLen } = arr
	const { length: sepLen } = sep
	const resLen = Math.max(0, arrLen + (arrLen - 1) * sepLen)
	const res = new Array(resLen)
	__join(res, 0, arr, 0, arrLen, sep, 0, sepLen)
	return res
}

module.exports = { join }
