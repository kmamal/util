const { test } = require('@xyz/tests')
const { random } = require('.')

test('random.random', (t) => {
	const N = 100000
	let min = Infinity
	let max = -Infinity
	let sum = 0
	const A = 10
	const buckets = Array(A).fill(0)

	for (let i = 0; i < N; i++) {
		const r = random()
		min = Math.min(min, r)
		max = Math.max(max, r)
		sum += r
		const index = Math.floor(r * A)
		buckets[index] += 1
	}

	const avg = sum / N

	t.ok(0 < min && min < 0.01)
	t.ok(0.99 < max && max < 1)
	t.ok(0.49 < avg && avg < 0.51)
	for (let i = 0; i < 10; i++) {
		const ratio = A * buckets[i] / N
		t.ok(0.9 < ratio && ratio < 1.1)
	}
})
