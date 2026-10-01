const { test } = require('@kmamal/testing')
const { MiddleSquareWeyl } = require('./middle-square-weyl')

const sample = (seed) => {
	const rng = new MiddleSquareWeyl(seed)
	return [ rng.uniform(), rng.uniform(), rng.uniform() ]
}

test("random.seeded.MiddleSquareWeyl Deterministic", (t) => {
	t.equal(sample(12345), sample(12345))
	t.equal(sample(0.25), sample(0.25))
})

test("random.seeded.MiddleSquareWeyl Distinct seeds", (t) => {
	const seeds = [ 0, 1, 2, 42, 12345, -1, 0.5, 0.5 + 1e-7, 0.5 + 1e-15 ]
	const keys = new Set(seeds.map((seed) => sample(seed).join()))
	t.equal(keys.size, seeds.length)
})

test("random.seeded.MiddleSquareWeyl Range", (t) => {
	const rng = new MiddleSquareWeyl(7)
	const N = 100000
	const B = 10
	const buckets = new Array(B).fill(0)
	for (let i = 0; i < N; i++) {
		const u = rng.uniform()
		t.ok(u >= 0 && u < 1)
		buckets[Math.floor(u * B)] += 1
	}
	for (const count of buckets) {
		const ratio = B * count / N
		t.ok(0.95 < ratio && ratio < 1.05, { ratio })
	}
})
