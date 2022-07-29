
const amrap = (fnIterate, timeLimit, options = {}) => {
	const startTime = Date.now()

	const {
		initial = 1,
		scaling = 10,
		safety = 1,
	} = options

	let remaining = timeLimit
	let next = (safety * initial) | 0
	let reps = 0

	for (;;) {
		const done = fnIterate(next, remaining)

		const ellapsed = Date.now() - startTime
		remaining = timeLimit - ellapsed
		reps += next

		const timePerRep = ellapsed / reps
		next = Math.floor(safety * Math.min(next * scaling, remaining / timePerRep))

		if (done || remaining <= 0 || next === 0) {
			return { ellapsed, reps }
		}
	}
}

module.exports = { amrap }
