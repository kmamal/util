const { BASES } = require('./duration')
const { shift } = require('./shift')
const { getPart } = require('./parts')

const elapsed = (a, b, key) => {
	const duration = BASES[key]
	if (!duration) { return null }

	const at = a.getTime()
	const bt = b.getTime()
	const t = bt - at
	let estimate = Math.floor(t / duration)

	const c = shift(a, key, estimate)
	const cmp = getPart(c, key) - getPart(b, key)

	if (cmp) {
		const ct = c.getTime()
		estimate += Math.sign(bt - ct)
	}

	return estimate
}

module.exports = { elapsed }
