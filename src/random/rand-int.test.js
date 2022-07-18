const { test } = require('@kmamal/testing')
const { addDefault } = require('../map/add-default')
const { randInt } = require('./rand-int')

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
		const ratio = A * buckets.get(i) / N
		t.ok(0.9 < ratio && ratio < 1.1)
	}
})
