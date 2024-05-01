const { test } = require('@kmamal/testing')
const { createTests: createTestCasesForUnstableSort } = require('./test-cases-for-unstable-sort')
const { create } = require('../../create')

const createTests = (name) => {
	createTestCasesForUnstableSort(name)

	const S = require(`../${name}`)

	test(`array.sorting.${name}.stability`, (t) => {
		const arr = create(1000, (_, id) => ({ id, value: 1 }))
		const expected = Array.from(arr)
		expected.sort((a, b) => a.value - b.value)
		const sorted = S[`${name}By`](arr, (x) => x.value)
		t.equal(sorted, expected)
	})
}

module.exports = { createTests }
