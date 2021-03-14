
const pick = (obj, keys) => {
	const res = {}
	for (const key of keys) {
		res[key] = obj[key]
	}
	return res
}

module.exports = { pick }
