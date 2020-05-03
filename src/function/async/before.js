
const before = (fn, n) => {
	let count = 1
	let last_result
	return (...args) => {
		if (count < n) {
			count += 1
			last_result = fn(...args)
		}
		return last_result
	}
}

module.exports = { before }
