const { rand } = require('./rand')
const { randInt } = require('./rand-int')
const { __shuffle } = require('./shuffle')

const __chooseN = (dst, dstStart, src, srcStart, srcEnd, _n, options) => {
	const length = srcEnd - srcStart
	const n = Math.min(length, _n)
	if (n <= 0) { return 0 }

	let writeIndex = dstStart

	if (3 * n > length) {
		let readIndex = srcStart
		for (let i = 0; i < n; i++) {
			dst[writeIndex++] = src[readIndex++]
		}

		for (let i = n; i < length; i++) {
			const r = rand(i + 1)
			if (r < n) {
				dst[dstStart + r] = src[srcStart + i]
			}
		}

		return n
	}

	const selected = new Set()

	const first = randInt(srcStart, srcEnd, options)
	dst[writeIndex++] = src[first]
	selected.add(first)

	let size = 1
	while (size < n) {
		let index
		do {
			index = randInt(srcStart, srcEnd, options)
			selected.add(index)
		} while (size === selected.size)
		size += 1
		dst[writeIndex++] = src[index]
	}

	return n
}

const chooseN = (arr, n, options) => {
	const res = new Array(n)
	const m = __chooseN(res, 0, arr, 0, arr.length, n, options)
	res.length = m
	return res
}

const chooseNTo = (dst, arr, _n, options) => {
	const { length } = arr
	const n = Math.min(length, _n)
	__shuffle(dst, 0, length, n, options)
	dst.length = n
	return dst
}

const chooseN$$$ = (arr, _n, options) => {
	const { length } = arr
	const n = Math.min(length, _n)
	__shuffle(arr, 0, length, n, options)
	arr.length = n
	return arr
}

chooseN.$$$ = chooseN$$$
chooseN.to = chooseNTo

module.exports = {
	__chooseN,
	chooseN,
}
