const { identity } = require('../function/identity')

const __count = (counts, arr, start, end, fn) => {
	for (let i = start; i < end; i++) {
		const item = arr[i]
		const key = fn(item)
		const n = counts[key] || 0
		counts[key] = n + 1
	}
}

const countBy = (arr, fn) => {
	const counts = {}
	__count(counts, arr, 0, arr.length, fn)
	return counts
}

const count = (arr) => countBy(arr, identity)

module.exports = {
	__count,
	countBy,
	count,
}
