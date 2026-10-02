const { test } = require('@kmamal/testing')
const { addDefault } = require('../map/add-default')
const { MiddleSquareWeyl } = require('./seeded/middle-square-weyl')
const { __randFloat, randFloat } = require('./rand-float')

test("random.randFloat", (t) => {
	const A = 10
	const B = 20
	const D = B - A
	const N = 100000
	let min = Infinity
	let max = -Infinity
	let sum = 0
	const buckets = new Map()
	addDefault(buckets, () => 0)

	for (let i = 0; i < N; i++) {
		const r = randFloat(A, B)
		min = Math.min(min, r)
		max = Math.max(max, r)
		sum += r
		const index = Math.floor(r - A)
		buckets.set(index, buckets.get(index) + 1)
	}

	const avg = sum / N

	t.ok(A < min && min < A * 1.1)
	t.ok(B * 0.9 < max && max < B)
	const V = A + D / 2
	t.ok(V * 0.9 < avg && avg < V * 1.1)
	for (let i = 0; i < 10; i++) {
		const ratio = D * buckets.get(i) / N
		t.ok(0.9 < ratio && ratio < 1.1)
	}
})

test("random.__randFloat", (t) => {
	const rng = new MiddleSquareWeyl(4)
	const twin = new MiddleSquareWeyl(4)
	for (let i = 0; i < 1000; i++) {
		const r = __randFloat(rng, -2, 3)
		t.equal(r, twin.uniform() * 5 - 2)
		t.ok(r >= -2 && r < 3)
	}

	const M = Number.MAX_VALUE
	let negative = 0
	for (let i = 0; i < 1000; i++) {
		const r = __randFloat(rng, -M, M)
		t.ok(Number.isFinite(r) && r >= -M && r <= M)
		if (r < 0) { negative++ }
	}
	t.ok(400 < negative && negative < 600, { negative })
})

test("random.__randFloat never returns b", (t) => {
	const top = 1 - 2 ** -53
	const sequence = (...values) => {
		let i = 0
		return { uniform: () => values[i++] }
	}

	t.equal(__randFloat(sequence(top, 0.5), 3, 4), 3.5)
	t.equal(__randFloat(sequence(top, 0), 1e9, 1e9 + 1), 1e9)
	t.equal(__randFloat(sequence(top, 0.25), -4, -3), -3.75)

	const M = Number.MAX_VALUE
	t.ok(__randFloat(sequence(top), -M, M) < M)

	t.equal(__randFloat(sequence(top), 5, 5), 5)
	t.equal(__randFloat(sequence(0.5), 4, 3), 3.5)
})
