const { clone } = require('./clone')
const normalize = require('../normalize')
const { copy_BANG: copy1d_BANG } = require('../../copy')

const copy = (a, ...rest) => {
	const c = clone(a)
	copy_BANG(c, ...rest)
	return c
}

const copy_BANG = (a, b, _offset, _start, _end) => {
	const [ offset_i, offset_j ] = normalize.start(a, _offset)
	const [ [ start_i, start_j ], [ end_i, end_j ] ] = normalize.range(b, _start, _end)
	for (let aj = offset_j, bj = start_j; bj < end_j; aj++, bj++) {
		copy1d_BANG(a[aj], b[bj], offset_i, start_i, end_i)
	}
}

module.exports = {
	copy,
	copy_BANG,
}
