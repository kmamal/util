const { defaultRng } = require('./default-rng')

const __randFloat = (rng, _a, _b) => {
	let a = _a
	let b = _b
	let range = b - a
	if (range === 0) { return a }

	if (range !== Infinity) {
		for (;;) {
			const r = rng.uniform() * range + a
			if (r !== b) { return r }
		}
	}

	a /= 2
	b /= 2
	range = b - a
	for (;;) {
		const r = 2 * (rng.uniform() * range + a)
		if (r !== _b) { return r }
	}
}

const randFloat = (a, b) => __randFloat(defaultRng, a, b)

module.exports = {
	__randFloat,
	randFloat,
}
