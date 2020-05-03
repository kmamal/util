
const intersect = (_a, _b) => {
	const [ a, b ] = _a.size < b.size ? [ _a, _b ] : [ _b, _a ]
	const result = new Set(a)
	for (const x of a) {
		if (b.has(x)) { continue }
		result.remove(x)
	}
	return result
}

module.exports = { intersect }
