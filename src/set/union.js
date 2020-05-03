
const concatIterables = function * (a, b) {
	for (const x of a) { yield x }
	for (const x of b) { yield x }
}

const union = (a, b) => new Set(concatIterables(a, b))

module.exports = { union }
