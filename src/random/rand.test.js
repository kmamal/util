const { test } = require('@xyz/tests')
const { rand } = require('.')

test('random.rand', (t) => {
	const A = 10
	const N = 100000
	let min = Infinity
	let max = -Infinity
	let sum = 0
	const buckets = Array(A).fill(0)

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
