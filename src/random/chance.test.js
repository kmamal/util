const { test } = require('@kmamal/testing')
const { MiddleSquareWeyl } = require('./seeded/middle-square-weyl')
const { __chance, chance } = require('./chance')

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

test("random.__chance", (t) => {
	const rng = new MiddleSquareWeyl(5)
	const twin = new MiddleSquareWeyl(5)
	for (let i = 0; i < 1000; i++) {
		t.equal(__chance(rng, 0.3), twin.uniform() < 0.3)
	}
	for (let i = 0; i < 1000; i++) {
		t.equal(__chance(rng, 0), false)
		t.equal(__chance(rng, 1), true)
	}
})
