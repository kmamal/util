const { test } = require('@kmamal/testing')
const { sum } = require('../array/sum')
const { chooseFromWeights } = require('./weighted')

test("sampling.chooseFromWeights Edge-cases", (t) => {
	t.equal(chooseFromWeights([]), -1)
	t.equal(chooseFromWeights([ 1 ]), 0)
})

test("sampling.chooseFromWeights Frequencies", (t) => {
	const arr = [ 1, 3, 2 ]
	const N = 3000

	const counts = new Map()

	for (let i = 0; i < N; i++) {
		const index = chooseFromWeights(arr)
		counts.set(index, (counts.get(index) ?? 0) + 1)
	}

	const total = sum(arr)
	for (let i = 0; i < arr.length; i++) {
		const count = counts.get(i)
		const expected = N * arr[i] / total
		const ratio = count / expected
		t.ok(ratio > 0.9 && ratio < 1.1, { ratio })
	}
})
