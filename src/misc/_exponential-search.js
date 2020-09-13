
const exponentialSearch = async (evaluate, initial = 1) => {
	let direction = await evaluate(initial)
	if (direction === 0) { return initial }

	// Find bounds
	let lower_bound
	let upper_bound
	let value = initial

	if (direction < 0) {
		while (direction < 0 && value !== 0) {
			upper_bound = value
			value /= 2
			direction = await evaluate(value)
		}
		lower_bound = value
	} else {
		while (direction > 0 && value !== Infinity) {
			lower_bound = value
			value *= 2
			direction = await evaluate(value)
		}
		upper_bound = value
	}

	// Find value
	for (;;) {
		value = (upper_bound - lower_bound) / 2 + lower_bound
		direction = await evaluate(value)
		if (direction === 0) { break }

		if (direction < 0) {
			upper_bound = value
		} else {
			lower_bound = value
		}
	}

	return value
}

module.exports = { exponentialSearch }
