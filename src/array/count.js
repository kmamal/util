const { identity } = require('../function/identity')

const __count = (counts, arr, start, end, fn_map) => {
	for (let i = start; i < end; i++) {
		const item = arr[i]
		const key = fn_map(item)
		const n = counts[key] || 0
		counts[key] = n + 1
	}
}

const countBy = (arr, fn_map) => {
	const counts = Object.create(null)
	__count(counts, arr, 0, arr.length, fn_map)
	return counts
}

const count = (arr) => countBy(arr, identity)

module.exports = {
	__count,
	countBy,
	count,
}
