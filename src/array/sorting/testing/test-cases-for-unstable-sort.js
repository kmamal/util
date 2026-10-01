const { test } = require('@kmamal/testing')
const { testVariants, JUNK } = require('../../../testing/test-variants')
const { sub } = require('../../../operators')
const { compare } = require('../../../function/compare')
const { create } = require('../../create')
const { MiddleSquareWeyl } = require('../../../random/seeded/middle-square-weyl')

const junkLongArray = () => create(2000, () => JUNK)

const RANGE_LENGTHS = [ 0, 1, 2, 3, 5, 16, 17, 33, 64, 100, 1000 ]

const createRangeTests = (name, fnSort) => {
	test(name, (t) => {
		const rng = new MiddleSquareWeyl(1)
		const generators = [
			() => rng.uniform(),
			() => Math.floor(rng.uniform() * 10),
		]

		const check = (values, start) => {
			const before = create(start, () => 2 + rng.uniform())
			const after = create(7, () => -1 - rng.uniform())
			const arr = [ ...before, ...values, ...after ]
			const end = start + values.length
			fnSort(arr, start, end, compare)
			t.equal(arr.slice(0, start), before)
			t.equal(arr.slice(end), after)
			t.equal(arr.slice(start, end), Array.from(values).sort(sub))
		}

		for (const length of RANGE_LENGTHS) {
			for (const generator of generators) {
				const values = create(length, generator)
				check(values, 5)
				check(values, 0)
				check(Array.from(values).sort(sub), 3)
				check(Array.from(values).sort((a, b) => b - a), 3)
			}
		}

		check([ 2, 1 ], 1)
		check([ 1, 1, 1 ], 2)
	})
}

const createTests = (name, fnSortRange) => {
	if (fnSortRange) { createRangeTests(`array.sorting.__${name}`, fnSortRange) }

	const S = require(`../${name}`)
	const options = { dst: junkLongArray }

	testVariants(`array.sorting.${name}`, S[name], (t, f) => {
		{
			const a = create(1000, Math.random)
			const expected = Array.from(a)
			expected.sort(sub)
			t.equal(f(a), expected)
		}

		{
			const a = create(1000, () => Math.floor(Math.random() * 10))
			const expected = Array.from(a)
			expected.sort(sub)
			t.equal(f(a), expected)
		}
	}, options)

	testVariants(`array.sorting.${name}By`, S[`${name}By`], (t, f) => {
		const a = create(1000, Math.random)
		const expected = Array.from(a)
		expected.sort((x, y) => y - x)
		t.equal(f(a, (x) => -x), expected)
	}, options)

	testVariants(`array.sorting.${name}With`, S[`${name}With`], (t, f) => {
		const a = create(1000, Math.random)
		const expected = Array.from(a)
		expected.sort((x, y) => y - x)
		t.equal(f(a, (x, y) => y - x), expected)
	}, options)
}

module.exports = { createTests, createRangeTests, junkLongArray }
