
const __recurse = function * (dst, dst_index, src, n, k, index) {
	const remaining = dst_index - k
	if (remaining === 0) {
		yield dst.slice()
		return
	}

	const available = n - index
	if (available < remaining) { return }

	const next_dst_index = dst_index + 1

	let i = index
	while (i < n) {
		dst[dst_index] = src[i++]
		yield* __recurse(dst, next_dst_index, src, n, k, i)
	}
}

const combinations = function * (arr, k) {
	const res = new Array(k)
	yield* __recurse(res, 0, arr, arr.length, k, 0)
}

module.exports = { combinations }
