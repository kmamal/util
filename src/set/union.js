
const concat = function * (a, b) {
	for (const x of a) { yield x }
	for (const x of b) { yield x }
}

const union = (a, b) => new Set(concat(a, b))

module.exports = { union }
