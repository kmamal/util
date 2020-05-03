const { random } = require('./random')

const randFloat = (_a, _b) => {
	let a = _a
	let b = _b
	let range = b - a
	let scale = 1

	if (range === Infinity) {
		a /= 2
		b /= 2
		range = b - a
		scale = 2
	}
	return scale * (random() * range + a)
}

module.exports = { randFloat }
