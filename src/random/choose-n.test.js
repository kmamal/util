const { testVariants } = require('../testing/test-variants')
const { addDefault } = require('../map/add-default')
const { range } = require('../range/range')
const { test } = require('@kmamal/testing')
const { MiddleSquareWeyl } = require('./seeded/middle-square-weyl')
const { __chooseN, chooseN } = require('./choose-n')

testVariants("random.chooseN", chooseN, (t, f) => {
	{
		const A = 10
		const B = 20
		const arr = [ ...range(A, B) ]
		const N = 100000
		const M = 7
		let min = Infinity
		let max = -Infinity
		let sum = 0
		const buckets = new Map()
		addDefault(buckets, () => 0)

		for (let i = 0; i < N; i++) {
			const choices = f(Array.from(arr), M)
			t.equal(choices.length, M)
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
			const ratio = D * buckets.get(i) / (N * M)
			t.ok(0.9 < ratio && ratio < 1.1)
		}
	}

	{
		const arr = [ 0, 1, 2, 3, 4 ]
		const N = 20000
		const M = 2
		const counts = new Map()
		addDefault(counts, () => 0)

		for (let i = 0; i < N; i++) {
			const choices = f(Array.from(arr), M)
			t.equal(choices.length, M)
			const key = choices.join('_')
			counts.set(key, counts.get(key) + 1)
		}

		const P = arr.length * (arr.length - 1)
		t.equal(counts.size, P)
		for (const count of counts.values()) {
			const ratio = P * count / N
			t.ok(0.85 < ratio && ratio < 1.15, { ratio })
		}
	}
})

test("random.__chooseN", (t) => {
	const rng = new MiddleSquareWeyl(10)
	const src = [ 'x', 'x', 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 'y', 'y' ]
	const srcCopy = Array.from(src)
	const N = 20000

	for (const n of [ 1, 2, 3, 4, 7, 10 ]) {
		const counts = new Map()
		addDefault(counts, () => 0)
		for (let i = 0; i < N; i++) {
			const dst = [ 'a', 'b', 'c' ]
			t.equal(__chooseN(rng, dst, 2, src, 2, 12, n), n)
			t.equal(dst.length, 2 + n)
			t.equal(dst.slice(0, 2), [ 'a', 'b' ])
			const chosen = dst.slice(2)
			t.equal(new Set(chosen).size, n)
			for (const r of chosen) {
				t.ok(Number.isInteger(r) && r >= 10 && r < 20, { r })
				counts.set(r, counts.get(r) + 1)
			}
		}
		t.equal(counts.size, 10)
		for (const count of counts.values()) {
			const ratio = 10 * count / (N * n)
			t.ok(0.9 < ratio && ratio < 1.1, { n, ratio })
		}
	}
	t.equal(src, srcCopy)

	const padded = [ 'a', 'b', 'c', 'd', 'e', 'f' ]
	t.equal(__chooseN(rng, padded, 1, src, 3, 5, 2), 2)
	t.equal(padded[0], 'a')
	t.equal(padded.slice(3), [ 'd', 'e', 'f' ])
	t.equal(padded.slice(1, 3).sort(), [ 11, 12 ])

	const sparse = [ 'a', 'b', 'c', 'd', 'e', 'f' ]
	t.equal(__chooseN(rng, sparse, 2, src, 2, 12, 2), 2)
	t.equal(sparse.slice(0, 2), [ 'a', 'b' ])
	t.equal(sparse.slice(4), [ 'e', 'f' ])

	const clamped = [ 'a' ]
	t.equal(__chooseN(rng, clamped, 1, src, 4, 7, 10), 3)
	t.equal(clamped[0], 'a')
	t.equal(clamped.slice(1).sort(), [ 12, 13, 14 ])

	const zero = [ 'a', 'b' ]
	t.equal(__chooseN(rng, zero, 1, src, 2, 12, 0), 0)
	t.equal(zero, [ 'a', 'b' ])

	const empty = [ 'a', 'b' ]
	t.equal(__chooseN(rng, empty, 1, src, 5, 5, 3), 0)
	t.equal(empty, [ 'a', 'b' ])

	const single = [ 'a', 'b' ]
	t.equal(__chooseN(rng, single, 1, src, 5, 6, 1), 1)
	t.equal(single, [ 'a', 13 ])

	const a = new MiddleSquareWeyl(11)
	const b = new MiddleSquareWeyl(11)
	const dstA = []
	const dstB = []
	__chooseN(a, dstA, 0, src, 2, 12, 3)
	__chooseN(b, dstB, 0, src, 2, 12, 3)
	t.equal(dstA, dstB)
})
