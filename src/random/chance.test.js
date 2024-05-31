const { test } = require('@kmamal/testing')
const { chance } = require('./chance')

test("random.chance", (t) => {
	const N = 10000

	const P = 1 / 3
	let numPassed = 0

	for (let i = 0; i < N; i++) {
		if (chance(P)) { numPassed++ }
	}

	const ratio = numPassed / N
	t.ok(P * 0.9 < ratio && ratio < P * 1.1)
})
