
const xor = (a, b) => {
	const result = new Set()

	for (const x of a) {
		if (b.has(x)) { continue }
		result.add(x)
	}

	for (const x of b) {
		if (a.has(x)) { continue }
		result.add(x)
	}

	return result
}

module.exports = { xor }
