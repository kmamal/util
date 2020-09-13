
const fromFactory = (n, factory) => {
	const res = Array(n)
	for (let i = 0; i < n; i++) {
		res[i] = factory(i)
	}
	return res
}

module.exports = { fromFactory }
