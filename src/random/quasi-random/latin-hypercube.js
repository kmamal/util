const { randInt } = require('../rand-int')
const { random } = require('../random')

const randomPointsInDimensions = (num_points, num_dimensions, options) => {
	const getRandom = options?.random ?? random

	const points = new Array(num_points)
	const width = 1 / num_points

	for (let i = 0; i < num_points; i++) {
		const point = new Array(num_dimensions)
		for (let j = 0; j < num_dimensions; j++) {
			point[j] = i
		}
		points[i] = point
	}

	const last = num_points - 1
	for (let i = 0; i < last; i++) {
		const point = points[i]
		for (let j = 0; j < num_dimensions; j++) {
			const index = randInt(i, num_points, options)
			const other = points[index]
			const offset = other[j]
			other[j] = point[j]
			point[j] = (offset + getRandom()) * width
		}
	}

	for (let j = 0; j < num_dimensions; j++) {
		points[last][j] = (points[last][j] + getRandom()) * width
	}

	return points
}

module.exports = { randomPointsInDimensions }
