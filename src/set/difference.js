
const difference = (a, b) => {
	const result = new Set()
	for (const x of a) {
		if (b.has(x)) { continue }
		result.add(x)
	}
	return result
}

module.exports = { difference }
