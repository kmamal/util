const { __reduce } = require('./reduce')
const { identity } = require('../function/identity')


const __min = (arr, start, end, fn) => __reduce(arr, start, end, (a, item) => {
	const value = fn(item)
	return value < a.value ? { item, value } : a
}, { value: Infinity }).item

const minBy = (arr, fn) => __min(arr, 0, arr.length, fn)

const min = (arr) => minBy(arr, identity)

module.exports = {
	__min,
	minBy,
	min,
}
