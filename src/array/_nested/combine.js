const { clone } = require('./clone')
const normalize = require('../normalize')
const { combine_BANG: combine1d_BANG } = require('../../combine')

const combine = (a, ...rest) => {
	const c = clone(a)
	combine_BANG(c, ...rest)
	return c
}

const combine_BANG = (a, b, combiner, _offset, _start, _end) => {
	const [ offset_i, offset_j ] = normalize.start(a, _offset)
	const [ [ start_i, start_j ], [ end_i, end_j ] ] = normalize.range(b, _start, _end)
	for (let aj = offset_j, bj = start_j; bj < end_j; aj++, bj++) {
		combine1d_BANG(a[aj], b[bj], offset_i, start_i, end_i, combiner)
	}
}

module.exports = {
	combine,
	combine_BANG,
}
