const { clone } = require('./clone')
const endpoints = require('./endpoints')

const combine = (a, ...rest) => {
	const c = clone(a)
	combine_BANG(c, ...rest)
	return c
}

const combine_BANG = (a, b, _offset, _start, _end, combiner) => {
	const offset = endpoints.start(a.length, _offset)
	const start = endpoints.start(b.length, _start)
	const end = endpoints.end(b.length, _end)
	for (let ai = offset, bi = start; bi < end; ai++, bi++) {
		a[ai] = combiner(a[ai], b[bi])
	}
}

module.exports = {
	combine,
	combine_BANG,
}
