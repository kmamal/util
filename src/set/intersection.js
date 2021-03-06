
const intersection = (_a, _b) => {
	const [ a, b ] = _a.size < _b.size ? [ _a, _b ] : [ _b, _a ]
	const result = new Set(a)
	for (const x of a) {
		if (b.has(x)) { continue }
		result.delete(x)
	}
	return result
}

module.exports = { intersection }
