const { test } = require('@xyz/tests')
const { sub } = require('../../../operators')

const createTests = (name) => {
	const S = require(`../${name}`)

	test(`array.sorting.${name}`, (t) => {
		const a = Array.from({ length: 1000 }, Math.random)
		const expected = Array.from(a)
		expected.sort(sub)
		const sorted = S[name](a)
		t.equal(sorted, expected)
	})

	test(`array.sorting.${name}.$$$`, (t) => {
		const a = Array.from({ length: 1000 }, Math.random)
		const expected = Array.from(a)
		expected.sort(sub)
		const sorted = S[name].$$$(a)
		t.equal(sorted, expected)
	})
}

module.exports = { createTests }
