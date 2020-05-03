const { random, randInt } = require('../random')

const sampleIndexes = function * (arr, _n) {
	const { length } = arr

	const n = Math.min(length, _n)
	if (n <= 0) { return }

	// rewrite to use a skip() function
	let remaining = n
	let skip_probability = 1
	let prev_probability = 0
	let r = random()
	for (let available = length; available > 0; available--) {
		const hit_probability = remaining / available
		const probability = prev_probability + skip_probability * hit_probability
		if (r < probability) {
			const arr_index = length - available
			yield arr[arr_index]
			remaining -= 1
			if (remaining === 1) {
				yield arr[randInt(arr_index + 1, length)]
				break
			}
			skip_probability = 1
			prev_probability = 0
			r = random()
		} else {
			prev_probability = probability
			skip_probability *= 1 - hit_probability
		}
	}
}

const sampleValues = function * (arr, n) {
	for (const index of sampleIndexes(arr, n)) {
		yield arr[index]
	}
}

module.exports = {
	sampleIndexes,
	sampleValues,
}
