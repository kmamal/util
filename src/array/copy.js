
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

const copy$$$ = (a, b) => {
	if (a === b) { return a }
	__copy(a, 0, b, 0, b.length)
	return a
}

const copy = (a, b) => {
	if (a === b) { return a }
	const res = new Array(b.length)
	__copy(res, 0, b, 0, b.length)
	return res
}

copy.$$$ = copy$$$

module.exports = {
	__copy,
	__copyRight,
	__copyInplace,
	copy,
}
