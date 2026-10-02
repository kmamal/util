const { test } = require('@kmamal/testing')
const { sum } = require('../array/sum')
const { sub } = require('../operators/arithmetic/sub')
const { MiddleSquareWeyl } = require('./seeded/middle-square-weyl')
const { __chooseFromPrefixSums, chooseFromWeights, chooseFromPrefixSumsBy } = require('./weighted')
const { defaultRng } = require('./default-rng')

test("sampling.chooseFromWeights Edge-cases", (t) => {
	t.equal(chooseFromWeights([]), -1)
	t.equal(chooseFromWeights([ 1 ]), 0)
})

test("sampling.chooseFromWeights Frequencies", (t) => {
	defaultRng.seed(2)
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

test("sampling.chooseFromPrefixSumsBy Frequencies", (t) => {
	defaultRng.seed(2)
	t.equal(chooseFromPrefixSumsBy([], (x) => x.sum), -1)

	const weights = [ 1, 3, 2 ]
	const sums = [ { sum: 1 }, { sum: 4 }, { sum: 6 } ]
	const N = 3000

	const counts = new Map()

	for (let i = 0; i < N; i++) {
		const index = chooseFromPrefixSumsBy(sums, (x) => x.sum)
		counts.set(index, (counts.get(index) ?? 0) + 1)
	}

	const total = sum(weights)
	for (let i = 0; i < weights.length; i++) {
		const count = counts.get(i)
		const expected = N * weights[i] / total
		const ratio = count / expected
		t.ok(ratio > 0.85 && ratio < 1.15, { ratio })
	}
})

test("random.__chooseFromPrefixSums", (t) => {
	const rng = new MiddleSquareWeyl(12)
	const arr = [ 1000, -5, 1, 4, 6, 1000, -5 ]
	const weights = [ 1, 3, 2 ]
	const N = 6000
	const counts = new Map()
	for (let i = 0; i < N; i++) {
		const index = __chooseFromPrefixSums(rng, arr, 2, 5, sub)
		t.ok(index >= 2 && index < 5, { index })
		counts.set(index, (counts.get(index) ?? 0) + 1)
	}
	for (let i = 0; i < weights.length; i++) {
		const ratio = counts.get(i + 2) / (N * weights[i] / 6)
		t.ok(ratio > 0.9 && ratio < 1.1, { ratio })
	}
	t.equal(arr, [ 1000, -5, 1, 4, 6, 1000, -5 ])

	t.equal(__chooseFromPrefixSums(rng, arr, 3, 3, sub), -1)
	for (let i = 0; i < 100; i++) {
		t.equal(__chooseFromPrefixSums(rng, arr, 4, 5, sub), 4)
	}

	const zeros = [ 1000, 0, 0, 5, 5, 8, 8, 1000 ]
	for (let i = 0; i < 1000; i++) {
		const index = __chooseFromPrefixSums(rng, zeros, 1, 7, sub)
		t.ok(index === 3 || index === 5, { index })
	}

	const a = new MiddleSquareWeyl(13)
	const b = new MiddleSquareWeyl(13)
	for (let i = 0; i < 100; i++) {
		t.equal(__chooseFromPrefixSums(a, arr, 2, 5, sub), __chooseFromPrefixSums(b, arr, 2, 5, sub))
	}
})

test("random.__chooseFromPrefixSums boundaries", (t) => {
	const at = (u, sums) => __chooseFromPrefixSums({ uniform: () => u }, sums, 0, sums.length, sub)
	const top = 1 - 2 ** -53

	t.equal(at(0, [ 0, 1 ]), 1)
	t.equal(at(0, [ 0, 0, 1, 1 ]), 2)
	t.equal(at(0.5, [ 1, 1, 2 ]), 2)
	t.equal(at(0.5, [ 1, 2 ]), 1)
	t.equal(at(top, [ 1, 2, 3 ]), 2)
	t.equal(at(top, [ 1, 1 ]), 0)
})

test("random.chooseFromPrefixSumsBy boundaries", (t) => {
	const at = (u, sums) => {
		defaultRng.uniform = () => u
		try { return chooseFromPrefixSumsBy(sums.map((value) => ({ sum: value })), (x) => x.sum) }
		finally { delete defaultRng.uniform }
	}
	const top = 1 - 2 ** -53

	t.equal(at(0, [ 0, 1 ]), 1)
	t.equal(at(0.5, [ 1, 1, 2 ]), 2)
	t.equal(at(top, [ 1, 1 ]), 0)
	t.ok(typeof defaultRng.uniform() === 'number')
})
