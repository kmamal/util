const { random } = require('../random')
const { randInt } = require('../rand-int')

const __sample1 = function * (length, n, options) {
	const getRandom = options?.random ?? random

	let remaining = n
	for (let i = 0; i < length; i++) {
		const probability = remaining / (length - i)
		const r = getRandom()
		if (r > probability) { continue }

		yield i
		remaining -= 1
		if (remaining === 0) { return }
		if (remaining === 1) {
			yield randInt(i + 1, length, options)
			return
		}
	}
}

const __sample2 = function * (length, n, options) {
	const getRandom = options?.random ?? random

	const skip = (remaining, initialy_available) => {
		let available = initialy_available
		let skip_probability = 1
		let prev_probability = 0
		const r = getRandom()
		for (;;) {
			const hit_probability = remaining / available
			const probability = prev_probability + skip_probability * hit_probability
			if (r < probability) { break }
			available -= 1
			prev_probability = probability
			skip_probability *= 1 - hit_probability
		}
		return initialy_available - available
	}

	let remaining = n
	let index = 0
	while (remaining > 1) {
		index += skip(remaining, length - index)
		yield index
		index += 1
		remaining -= 1
	}

	yield randInt(index, length, options)
}

const sampleIndexes = function * (arr, n, options) {
	const { length } = arr

	if (n > length) {
		const error = new Error("not enough elements")
		error.available = length
		error.required = n
		throw error
	}

	if (n === 0) { return }
	if (n === 1) {
		yield randInt(0, length, options)
		return
	}

	yield* __sample2(length, n, options)
}

const sampleValues = function * (arr, n, options) {
	for (const index of sampleIndexes(arr, n, options)) {
		yield arr[index]
	}
}

module.exports = {
	__sample1,
	__sample2,
	sampleIndexes,
	sampleValues,
}
