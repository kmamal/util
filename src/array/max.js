const { __reduce } = require('./reduce')
const { identity } = require('../function/identity')

const __max = (arr, start, end, fn) => __reduce(arr, start, end, (a, item) => {
	const value = fn(item)
	return value > a.value ? { item, value } : a
}, { value: -Infinity }).item

const maxBy = (arr, fn) => __max(arr, 0, arr.length, fn)

const max = (arr) => maxBy(arr, identity)

module.exports = {
	__max,
	maxBy,
	max,
}
