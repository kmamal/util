const { test } = require('@kmamal/testing')
const { createTests: createTestCasesForUnstableSort } = require('./test-cases-for-unstable-sort')

const createTests = (name) => {
	createTestCasesForUnstableSort(name)

	const S = require(`../${name}`)

	test(`array.sorting.${name}.stability`, (t) => {
		const arr = Array.from({ length: 1000 }, (x, id) => ({ id, value: 1 }))
		const expected = Array.from(arr)
		expected.sort((a, b) => a.value - b.value)
		const sorted = S[`${name}By`](arr, ({ value }) => value)
		t.equal(sorted, expected)
	})
}

module.exports = { createTests }
