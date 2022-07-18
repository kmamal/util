
const __scan = (dst, dstStart, src, srcStart, srcEnd, fn, init) => {
	if (srcStart === srcEnd) { return }

	let writeIndex = dstStart
	let readIndex = srcStart

	let acc = init

	const first = src[readIndex++]
	if (acc === undefined) {
		acc = first
	} else {
		acc = fn(acc, first)
	}
	dst[writeIndex++] = acc

	while (readIndex < srcEnd) {
		acc = fn(acc, src[readIndex++])
		dst[writeIndex++] = acc
	}
}
const __scanRight = (dst, dstStart, src, srcStart, srcEnd, fn, init) => {
	if (srcStart === srcEnd) { return }

	const length = srcEnd - srcStart
	const dstEnd = dstStart + length
	let writeIndex = dstEnd - 1
	let readIndex = srcEnd - 1

	let acc = init

	const last = src[readIndex--]
	if (acc === undefined) {
		acc = last
	} else {
		acc = fn(acc, last)
	}
	dst[writeIndex--] = acc

	while (readIndex >= srcStart) {
		acc = fn(acc, src[readIndex--])
		dst[writeIndex--] = acc
	}
}

const scan$$$ = (arr, fn, init) => {
	__scan(arr, 0, arr, 0, arr.length, fn, init)
	return arr
}

const scan = (arr, fn, init) => {
	const { length } = arr
	const res = new Array(length)
	__scan(res, 0, arr, 0, length, fn, init)
	return res
}

scan.$$$ = scan$$$

const scanRight$$$ = (arr, fn, init) => {
	__scanRight(arr, 0, arr, 0, arr.length, fn, init)
	return arr
}

const scanRight = (arr, fn, init) => {
	const { length } = arr
	const res = new Array(length)
	__scanRight(res, 0, arr, 0, length, fn, init)
	return res
}

scanRight.$$$ = scanRight$$$

module.exports = {
	__scan,
	__scanRight,
	scan,
	scanRight,
}
