const { startIndex } = require('./start-index')
const { endIndex } = require('./end-index')
const { __copy } = require('./copy')

const slice$$$ = (arr, _start, _end) => {
	const { length } = arr
	const start = startIndex(length, _start)
	const end = endIndex(length, _end)
	__copy(arr, 0, arr, start, end)
	arr.length = end - start
	return arr
}

const slice = (arr, start, end) => arr.slice(start, end)

slice.$$$ = slice$$$

module.exports = { slice }
