const { endpoints } = require('../interval/endpoints')
const { flatMap } = require('../array/flat-map')
const { forEach } = require('../array/for-each')
const { mergeWith } = require('../array/merge')
const { compareEndpoints } = require('./common/compare-endpoints')

const difference = (a, b) => {
	const make_a_endpoint = (y) => { y.source = a }
	const make_b_endpoint = (y) => { y.source = b }
	const a_points = flatMap(a, (x) => forEach(endpoints(x), make_a_endpoint))
	const b_points = flatMap(b, (x) => forEach(endpoints(x), make_b_endpoint))

	const points = mergeWith(a_points, b_points, compareEndpoints)

	const result = []
	let start = null
	let count = 0
	for (const { type, value, source } of points) {
		if (type === 'start') {
			count += 1
			if (count === 1 && source === a) {
				start = value
			} else if (count === 2 && source === b && start !== value) {
				result.push([ start, value ])
			}
		} else {
			count -= 1
			if (count === 0 && source === a && start !== value) {
				result.push([ start, value ])
			} else if (count === 1 && source === b) {
				start = value
			}
		}
	}
	return result
}

module.exports = { difference }
