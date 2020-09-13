const { test } = require('@xyz/tests')
const { fromFactory } = require('../map/from-factory')
const { range } = require('../range')
const { chooseN } = require('.')

test('random.chooseN', (t) => {
	const A = 10
	const B = 20
	const arr = [ ...range(A, B) ]
	const N = 100000
	const M = 3
	let min = Infinity
	let max = -Infinity
	let sum = 0
	const buckets = fromFactory(() => 0)

	for (let i = 0; i < N; i++) {
		const choices = chooseN(arr, M)
		for (const r of choices) {
			min = Math.min(min, r)
			max = Math.max(max, r)
			sum += r
			buckets.set(r, buckets.get(r) + 1)
		}
	}

	const avg = sum / (N * M)

	t.equal(min, A)
	t.equal(max, B - 1)
	const D = B - A
	const V = A + D / 2
	t.ok(V * 0.9 < avg && avg < V * 1.1)
	for (let i = A; i < B; i++) {
		const ratio = A * buckets.get(i) / (N * M)
		t.ok(0.9 < ratio && ratio < 1.1)
	}
})
