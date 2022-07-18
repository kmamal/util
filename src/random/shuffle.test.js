const { test } = require('@kmamal/testing')
const { addDefault } = require('../map/add-default')
const { permutations } = require('../array/combinatorics/permutations')
const { shuffle } = require('./shuffle')

test("random.shuffle", (t) => {
	const arr = [ 1, 2, 3 ]
	const N = 10000
	const counts = new Map()
	addDefault(counts, () => 0)

	for (let i = 0; i < N; i++) {
		const shuffled = shuffle(arr)
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
})
