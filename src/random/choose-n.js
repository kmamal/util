const { randInt } = require('./rand-int')
const { __shuffle } = require('./shuffle')

const __chooseN = (dst, dst_start, src, src_start, src_end, _n, options) => {
	const length = src_end - src_start
	const n = Math.min(length, _n)
	if (n <= 0) { return 0 }

	let write_index = dst_start
	const selected = new Set()

	const first = randInt(src_start, src_end, options)
	dst[write_index++] = src[first]
	selected.add(first)

	let size = 1
	while (size < n) {
		let index
		do {
			index = randInt(src_start, src_end, options)
			selected.add(index)
		} while (size === selected.size)
		size += 1
		dst[write_index++] = src[index]
	}

	return n
}

const chooseN$$$ = (arr, n, options) => {
	const { length } = arr
	__shuffle(arr, 0, length, n, options)
	arr.length = Math.min(length, n)
	return arr
}

const chooseN = (arr, n, options) => {
	const res = new Array(n)
	const m = __chooseN(res, 0, arr, 0, arr.length, n, options)
	res.length = m
	return res
}

chooseN.$$$ = chooseN$$$

module.exports = {
	__chooseN,
	chooseN,
}
