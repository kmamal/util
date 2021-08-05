const { startIndex } = require('./start-index')
const { endIndex } = require('./end-index')

const __copy = (a, offset, b, start, end) => {
	let writeIndex = offset
	let readIndex = start
	while (readIndex < end) {
		a[writeIndex++] = b[readIndex++]
	}
}

const __copyRight = (a, offset, b, start, end) => {
	const length = end - start
	let writeIndex = offset + length - 1
	let readIndex = end - 1
	while (readIndex >= start) {
		a[writeIndex--] = b[readIndex--]
	}
}

const __copyInplace = (arr, offset, start, end) => {
	const overlapsBadly = start < offset && offset < end
	if (!overlapsBadly) {
		__copy(arr, offset, arr, start, end)
	} else {
		__copyRight(arr, offset, arr, start, end)
	}
}

const copy$$$ = (a, _offset, b, _start, _end) => {
	const offset = startIndex(a.length, _offset)
	const start = startIndex(b.length, _start)
	const end = endIndex(b.length, _end)
	if (a === b) {
		__copyInplace(a, offset, start, end)
	} else {
		__copy(a, offset, b, start, end)
	}
	return a
}

const copy = (a, _offset, b, _start, _end) => {
	const { length: aLength } = a
	const { length: bLength } = b
	const aStart = startIndex(aLength, _offset)
	const bStart = startIndex(bLength, _start)
	const bEnd = endIndex(bLength, _end)
	const length = bEnd - bStart
	const aEnd = aStart + length

	const res = new Array(aLength)
	__copy(res, 0, a, 0, aStart)
	__copy(res, aStart, b, bStart, bEnd)
	__copy(res, aEnd, a, aEnd, aLength)

	return res
}

copy.$$$ = copy$$$

module.exports = {
	__copy,
	__copyRight,
	__copyInplace,
	copy,
}
