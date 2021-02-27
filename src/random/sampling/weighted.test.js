const { test } = require('@xyz/testing')
const { fromFactory } = require('../../map')
const { sum } = require('../../array/sum')
const { chooseIndexFromWeighted } = require('.')

test("sampling.chooseIndexFromWeighted Edge-cases", (t) => {
	t.equal(chooseIndexFromWeighted([]), -1)
	t.equal(chooseIndexFromWeighted([ 1 ]), 0)
})

test("sampling.chooseIndexFromWeighted Frequencies", (t) => {
	const arr = [ 1, 3, 2 ]
	const N = 3000

	const counts = fromFactory(() => 0)
	for (let i = 0; i < N; i++) {
		const index = chooseIndexFromWeighted(arr)
		counts.set(index, counts.get(index) + 1)
	}

	const total = sum(arr)
	for (let i = 0; i < arr.length; i++) {
		const count = counts.get(i)
		const expected = N * arr[i] / total
		const ratio = count / expected
		t.assert(() => ratio > 0.9 && ratio < 1.1)
	}
})
