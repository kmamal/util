const { clone } = require('./clone')
const endpoints = require('./endpoints')

const copy = (a, ...rest) => {
	const c = clone(a)
	copy_BANG(c, ...rest)
	return c
}

const copy_BANG = (a, b, _offset, _start, _end) => {
	const offset = endpoints.start(a.length, _offset)
	const start = endpoints.start(b.length, _start)
	const end = endpoints.end(b.length, _end)
	for (let ai = offset, bi = start; bi < end; ai++, bi++) {
		a[ai] = b[bi]
	}
}

module.exports = {
	copy,
	copy_BANG,
}
