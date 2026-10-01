const { test } = require('@kmamal/testing')
const { MiddleSquareWeyl } = require('./seeded/middle-square-weyl')
const { __rand, rand } = require('./rand')

test("random.rand", (t) => {
	const A = 10
	const N = 100000
	let min = Infinity
	let max = -Infinity
	let sum = 0
	const buckets = new Array(A).fill(0)

	for (let i = 0; i < N; i++) {
		const r = rand(A)
		min = Math.min(min, r)
		max = Math.max(max, r)
		sum += r
		buckets[r] += 1
	}

	const avg = sum / N

	t.equal(min, 0)
	t.equal(max, A - 1)
	t.ok(((A - 1) / 2) * 0.9 < avg && avg < ((A - 1) / 2) * 1.1)
	for (let i = 0; i < 10; i++) {
		const ratio = A * buckets[i] / N
		t.ok(0.9 < ratio && ratio < 1.1)
	}
})

test("random.__rand", (t) => {
	const rng = new MiddleSquareWeyl(2)
	const twin = new MiddleSquareWeyl(2)
	const seen = new Set()
	for (let i = 0; i < 1000; i++) {
		const r = __rand(rng, 7)
		t.equal(r, Math.floor(twin.uniform() * 7))
		t.ok(Number.isInteger(r) && r >= 0 && r < 7)
		seen.add(r)
	}
	t.equal(seen.size, 7)

	for (let i = 0; i < 100; i++) {
		t.equal(__rand(rng, 1), 0)
	}
})
