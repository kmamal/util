const { test } = require('@xyz/testing')
const { fromFactory } = require('../map/from-factory')
const { permutations } = require('../array/permutations')
const { shuffle } = require('.')

test("random.shuffle", (t) => {
	const arr = [ 1, 2, 3 ]
	const N = 10000
	const counts = fromFactory(() => 0)

	for (let i = 0; i < N; i++) {
		const shuffled = shuffle(arr)
		const key = shuffled.join('')
		counts.set(key, counts.get(key) + 1)
	}

	const all_permutations = [ ...permutations(arr) ]
	t.equal(counts.size, all_permutations.length)
	for (const permutation of all_permutations) {
		const key = permutation.join('')
		const ratio = all_permutations.length * counts.get(key) / N
		t.ok(0.9 < ratio && ratio < 1.1)
	}
})
