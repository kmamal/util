const { DURATION } = require('./duration')
const { shift } = require('./shift')
const { getPart } = require('./parts')

const elapsed = (a, b, part) => {
	const duration = DURATION[part]
	if (!duration) { return null }

	const at = a.getTime()
	const bt = b.getTime()
	const t = bt - at
	let estimate = Math.floor(t / duration)

	const c = shift(a, part, estimate)
	const cmp = getPart(c, part) - getPart(b, part)

	console.log({ estimate, c, cmp })

	if (cmp) {
		const ct = c.getTime()
		estimate += Math.sign(bt - ct)
	}

	return estimate
}

module.exports = { elapsed }
