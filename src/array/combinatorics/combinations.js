
const __recurse = function * (dst, dstIndex, src, n, k, index) {
	const remaining = k - dstIndex
	if (remaining === 0) {
		yield Array.from(dst)
		return
	}

	const available = n - index
	if (available < remaining) { return }

	const nextDstIndex = dstIndex + 1

	for (let i = index; i < n; i++) {
		dst[dstIndex] = src[i]
		yield* __recurse(dst, nextDstIndex, src, n, k, i + 1)
	}
}

const combinations = function * (arr, k) {
	const res = new Array(k)
	yield* __recurse(res, 0, arr, arr.length, k, 0)
}

module.exports = { combinations }
