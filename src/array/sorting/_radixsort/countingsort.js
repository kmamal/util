const { __fill } = require('../../fill')
const { __prefixSums } = require('../../prefix-sums')
const { __count } = require('../../count')

const __countingsort = (indexes, dst, dstStart, src, srcStart, srcEnd, n, fn) => {
	indexes[0] = dstStart
	__fill(indexes, 1, n + 1, 0)
	const plusOne = (x) => fn(x) + 1
	__count(indexes, src, srcStart, srcEnd, plusOne)
	__prefixSums(indexes, 0, indexes, 0, n)
	indexes.length = n

	for (let i = srcStart; i < srcEnd; i++) {
		const item = src[i]
		const key = fn(item)
		const index = indexes[key]
		dst[index] = item
		indexes[key] += 1
	}
}

module.exports = { __countingsort }
