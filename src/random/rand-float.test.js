const { test } = require('@xyz/testing')
const { withHooks } = require('../map/with-hooks')
const { randFloat } = require('./rand-float')

test("random.randFloat", (t) => {
	const A = 10
	const B = 20
	const D = B - A
	const N = 100000
	let min = Infinity
	let max = -Infinity
	let sum = 0
	const buckets = withHooks({ factory: () => 0 })

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
