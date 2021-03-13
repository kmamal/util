
const zip = (keys, values) => {
	const res = {}
	const { length } = keys
	for (let i = 0; i < length; i++) {
		const key = keys[i]
		const value = values[i]
		res[key] = value
	}
	return res
}

module.exports = { zip }
