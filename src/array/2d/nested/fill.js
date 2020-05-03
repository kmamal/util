const { clone } = require('./clone')
const normalize = require('../normalize')

const fill = (a, ...rest) => {
	const c = clone(a)
	fill_BANG(c, ...rest)
	return c
}

const fill_BANG = (array, filler, _start, _end) => {
	const [ [ start_i, start_j ], [ end_i, end_j ] ] = normalize.range(array, _start, _end)
	for (let j = start_j; j < end_j; j++) {
		array[j].fill(filler, start_i, end_i)
	}
}

module.exports = {
	fill,
	fill_BANG,
}
