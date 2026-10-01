const { test } = require('@kmamal/testing')
const { testVariants } = require('../../../testing/test-variants')
const {
	createTests: createTestCasesForUnstableSort,
	createRangeTests: createRangeTestCasesForUnstableSort,
	junkLongArray,
} = require('./test-cases-for-unstable-sort')
const { compareBy } = require('../../../function/compare')
const { create } = require('../../create')
const { MiddleSquareWeyl } = require('../../../random/seeded/middle-square-weyl')

const createRangeTests = (name, fnSort) => {
	createRangeTestCasesForUnstableSort(name, fnSort)

	test(`${name}.stability`, (t) => {
		const rng = new MiddleSquareWeyl(2)
		const fnCmp = compareBy((x) => x.value)

		const check = (values, start) => {
			const items = values.map((value, id) => ({ id, value }))
			const before = create(start, (i) => ({ id: -1 - i, value: 100 }))
			const after = create(7, (i) => ({ id: -100 - i, value: -100 }))
			const arr = [ ...before, ...items, ...after ]
			const end = start + items.length
			const expected = Array.from(items).sort((a, b) => a.value - b.value)
			fnSort(arr, start, end, fnCmp)
			t.equal(arr.slice(0, start), before)
			t.equal(arr.slice(end), after)
			t.equal(arr.slice(start, end).map((x) => x.id), expected.map((x) => x.id))
		}

		for (const length of [ 0, 1, 2, 3, 10, 17, 33, 100, 1000 ]) {
			const values = create(length, () => Math.floor(rng.uniform() * 5))
			check(values, 5)
			check(Array.from(values).sort((a, b) => b - a), 3)
		}

		check([ 2, -2, 2, 0, -2 ], 4)
	})
}

const createTests = (name, fnSortRange) => {
	createTestCasesForUnstableSort(name)
	if (fnSortRange) { createRangeTests(`array.sorting.__${name}`, fnSortRange) }

	const S = require(`../${name}`)
	const options = { dst: junkLongArray }

	testVariants(`array.sorting.${name}.stability`, S[`${name}By`], (t, f) => {
		const arr = create(1000, (id) => ({ id, value: Math.floor(Math.random() * 10) }))
		const expected = Array.from(arr)
		expected.sort((a, b) => a.value - b.value)
		const sorted = f(arr, (x) => x.value)
		t.equal(sorted.map((x) => x.id), expected.map((x) => x.id))
	}, options)

	testVariants(`array.sorting.${name}.stability.small`, S[`${name}By`], (t, f) => {
		const arr = [ 2, -2, 2, 0, -2 ].map((value, id) => ({ id, value }))
		const sorted = f(arr, (x) => x.value)
		t.equal(sorted.map((x) => x.id), [ 1, 4, 3, 0, 2 ])
	}, options)
}

module.exports = { createTests, createRangeTests }
