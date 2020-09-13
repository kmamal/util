
const amrap = async (iterate, time_limit, options = {}) => {
	const start_time = Date.now()

	const {
		initial = 1,
		scaling = 10,
		safety = 1,
	} = options

	let remaining = time_limit
	let next = (safety * initial) | 0
	let reps = 0

	for (;;) {
		const done = await iterate(next, remaining)

		const ellapsed = Date.now() - start_time
		remaining = time_limit - ellapsed
		reps += next

		const time_per_rep = ellapsed / reps
		next = Math.floor(safety * Math.min(next * scaling, remaining / time_per_rep))

		if (done || remaining <= 0 || next === 0) {
			return { ellapsed, reps }
		}
	}
}

module.exports = { amrap }
