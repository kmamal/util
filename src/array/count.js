const { identity } = require('../function/identity')

const __count = (counts, arr, start, end, fnMap) => {
	for (let i = start; i < end; i++) {
		const item = arr[i]
		const key = fnMap(item)
		const n = counts[key] || 0
		counts[key] = n + 1
	}
}

const countBy = (arr, fnMap) => {
	const counts = Object.create(null)
	__count(counts, arr, 0, arr.length, fnMap)
	return counts
}

const count = (arr) => countBy(arr, identity)

module.exports = {
	__count,
	countBy,
	count,
}
