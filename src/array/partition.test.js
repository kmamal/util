const { test } = require('@kmamal/testing')
const { __partition } = require('./partition')

const isEven = (x) => x % 2 === 0
const byValue = (a, b) => a - b

test("array.__partition", (t) => {
	for (let length = 0; length <= 7; length++) {
		for (let mask = 0; mask < 2 ** length; mask++) {
			const range = Array.from({ length }, (_, i) => 2 * i + ((mask >> i) & 1))
			const arr = [ 'x', 'x', ...range, 'x' ]
			const index = __partition(arr, 2, 2 + length, isEven)
			const info = { range, arr, index }
			const numEven = range.filter(isEven).length

			t.equal(index, 2 + numEven, info)
			t.equal(arr.slice(0, 2), [ 'x', 'x' ], info)
			t.equal(arr[2 + length], 'x', info)
			t.ok(arr.slice(2, index).every(isEven), info)
			t.ok(arr.slice(index, 2 + length).every((x) => !isEven(x)), info)
			t.equal(arr.slice(2, 2 + length).sort(byValue), range, info)
		}
	}
})
