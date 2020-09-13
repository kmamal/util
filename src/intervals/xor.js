const { endpoints } = require('../interval/endpoints')
const { flatMap } = require('../array/flat-map')
const { mergeWith } = require('../array/merge')
const { compareEndpoints } = require('./common/compare-endpoints')

const xor = (a, b) => {
	const a_points = flatMap(a, endpoints)
	const b_points = flatMap(b, endpoints)

	const points = mergeWith(a_points, b_points, compareEndpoints)

	const result = []
	let start = null
	let count = 0
	for (const { type, value } of points) {
		count += type === 'start' ? 1 : -1

		if (count === 1) {
			start = value
		} else {
			result.push([ start, value ])
		}
	}
	return result
}

module.exports = { xor }
