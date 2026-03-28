const { defaultRng } = require('./default-rng')

const __randFloat = (rng, _a, _b) => {
	let a = _a
	let b = _b
	let range = b - a

	if (range !== Infinity) {
		return rng.uniform() * range + a
	}

	a /= 2
	b /= 2
	range = b - a
	return 2 * (rng.uniform() * range + a)
}

const randFloat = (a, b) => __randFloat(defaultRng, a, b)

module.exports = {
	__randFloat,
	randFloat,
}
