const { testVariants } = require('../testing/test-variants')
const { addDefault } = require('../map/add-default')
const { permutations } = require('../array/combinatorics/permutations')
const { test } = require('@kmamal/testing')
const { MiddleSquareWeyl } = require('./seeded/middle-square-weyl')
const { __shuffle, shuffle } = require('./shuffle')

testVariants("random.shuffle", shuffle, (t, f) => {
	const arr = [ 1, 2, 3 ]
	const N = 10000
	const counts = new Map()
	addDefault(counts, () => 0)

	for (let i = 0; i < N; i++) {
		const shuffled = f(Array.from(arr))
		const key = shuffled.join('_')
		counts.set(key, counts.get(key) + 1)
	}

	const allPermutations = [ ...permutations(arr) ]
	t.equal(counts.size, allPermutations.length)
	for (const permutation of allPermutations) {
		const key = permutation.join('_')
		const ratio = allPermutations.length * counts.get(key) / N
		t.ok(0.9 < ratio && ratio < 1.1)
	}
}, { to: null })

test("random.__shuffle", (t) => {
	const rng = new MiddleSquareWeyl(8)
	const N = 6000
	const counts = new Map()
	addDefault(counts, () => 0)
	for (let i = 0; i < N; i++) {
		const arr = [ 'a', 'b', 1, 2, 3, 'c', 'd' ]
		t.equal(__shuffle(rng, arr, 2, 5, 5), arr)
		t.equal(arr.slice(0, 2), [ 'a', 'b' ])
		t.equal(arr.slice(5), [ 'c', 'd' ])
		t.equal(arr.slice(2, 5).sort(), [ 1, 2, 3 ])
		const key = arr.slice(2, 5).join('_')
		counts.set(key, counts.get(key) + 1)
	}
	const allPermutations = [ ...permutations([ 1, 2, 3 ]) ]
	t.equal(counts.size, allPermutations.length)
	for (const permutation of allPermutations) {
		const ratio = allPermutations.length * counts.get(permutation.join('_')) / N
		t.ok(0.9 < ratio && ratio < 1.1, { ratio })
	}

	const empty = [ 1, 2, 3 ]
	__shuffle(rng, empty, 1, 1, 3)
	t.equal(empty, [ 1, 2, 3 ])

	const single = [ 1, 2, 3 ]
	__shuffle(rng, single, 1, 2, 3)
	t.equal(single, [ 1, 2, 3 ])

	const noLimit = [ 1, 2, 3, 4 ]
	__shuffle(rng, noLimit, 1, 4, 1)
	t.equal(noLimit, [ 1, 2, 3, 4 ])

	const firstCounts = new Map()
	addDefault(firstCounts, () => 0)
	for (let i = 0; i < N; i++) {
		const arr = [ 0, 1, 2, 3, 4, 5, 6 ]
		const changed = []
		const proxy = new Proxy(arr, {
			set (target, key, value) {
				changed.push(Number(key))
				target[key] = value
				return true
			},
		})
		__shuffle(rng, proxy, 2, 6, 3)
		t.equal(arr.slice(0, 2), [ 0, 1 ])
		t.equal(arr[6], 6)
		t.equal(arr.slice(2, 6).sort(), [ 2, 3, 4, 5 ])
		t.ok(changed.every((index) => index >= 2 && index < 6))
		firstCounts.set(arr[2], firstCounts.get(arr[2]) + 1)
	}
	t.equal(firstCounts.size, 4)
	for (const count of firstCounts.values()) {
		const ratio = 4 * count / N
		t.ok(0.9 < ratio && ratio < 1.1, { ratio })
	}

	const a = new MiddleSquareWeyl(9)
	const b = new MiddleSquareWeyl(9)
	t.equal(
		__shuffle(a, [ 1, 2, 3, 4, 5, 6 ], 1, 5, 5),
		__shuffle(b, [ 1, 2, 3, 4, 5, 6 ], 1, 5, 5),
	)
})
