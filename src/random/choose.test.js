const { test } = require('@kmamal/testing')
const { addDefault } = require('../map/add-default')
const { range } = require('../range/range')
const { MiddleSquareWeyl } = require('./seeded/middle-square-weyl')
const { __choose, choose } = require('./choose')

test("random.choose", (t) => {
	const A = 10
	const B = 20
	const arr = [ ...range(A, B) ]
	const N = 100000
	let min = Infinity
	let max = -Infinity
	let sum = 0
	const buckets = new Map()
	addDefault(buckets, () => 0)

	for (let i = 0; i < N; i++) {
		const r = choose(arr)
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

test("random.__choose", (t) => {
	const rng = new MiddleSquareWeyl(6)
	const arr = [ 'x', 'x', 1, 2, 3, 'y' ]
	const counts = new Map()
	addDefault(counts, () => 0)
	const N = 3000
	for (let i = 0; i < N; i++) {
		const r = __choose(rng, arr, 2, 5)
		counts.set(r, counts.get(r) + 1)
	}
	t.equal([ ...counts.keys() ].sort(), [ 1, 2, 3 ])
	for (const count of counts.values()) {
		const ratio = 3 * count / N
		t.ok(0.9 < ratio && ratio < 1.1, { ratio })
	}
	t.equal(arr, [ 'x', 'x', 1, 2, 3, 'y' ])

	for (let i = 0; i < 100; i++) {
		t.equal(__choose(rng, arr, 3, 4), 2)
	}

	const a = new MiddleSquareWeyl(7)
	const b = new MiddleSquareWeyl(7)
	for (let i = 0; i < 100; i++) {
		t.equal(__choose(a, arr, 1, 6), __choose(b, arr, 1, 6))
	}
})
