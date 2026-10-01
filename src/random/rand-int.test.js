const { test } = require('@kmamal/testing')
const { addDefault } = require('../map/add-default')
const { MiddleSquareWeyl } = require('./seeded/middle-square-weyl')
const { __randInt, randInt } = require('./rand-int')

test("random.randInt", (t) => {
	const A = 10
	const B = 20
	const N = 100000
	let min = Infinity
	let max = -Infinity
	let sum = 0
	const buckets = new Map()
	addDefault(buckets, () => 0)

	for (let i = 0; i < N; i++) {
		const r = randInt(A, B)
		min = Math.min(min, r)
		max = Math.max(max, r)
		sum += r
		buckets.set(r, buckets.get(r) + 1)
	}

	const avg = sum / N

	t.equal(min, A)
	t.equal(max, B - 1)
	const D = B - A
	const V = A + D / 2
	t.ok(V * 0.9 < avg && avg < V * 1.1)
	for (let i = A; i < B; i++) {
		const ratio = D * buckets.get(i) / N
		t.ok(0.9 < ratio && ratio < 1.1)
	}
})

test("random.__randInt", (t) => {
	const rng = new MiddleSquareWeyl(3)
	const twin = new MiddleSquareWeyl(3)
	const seen = new Set()
	for (let i = 0; i < 1000; i++) {
		const r = __randInt(rng, -3, 4)
		t.equal(r, Math.floor(twin.uniform() * 7) - 3)
		t.ok(Number.isInteger(r) && r >= -3 && r < 4)
		seen.add(r)
	}
	t.equal(seen.size, 7)

	for (let i = 0; i < 100; i++) {
		t.equal(__randInt(rng, 5, 6), 5)
	}
})
