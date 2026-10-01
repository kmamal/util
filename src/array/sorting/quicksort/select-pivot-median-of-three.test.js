const { test } = require('@kmamal/testing')
const { __selectPivotMedianOfThree } = require('./select-pivot-median-of-three')
const { compare } = require('../../../function/compare')
const { sub } = require('../../../operators')
const { permutations } = require('../../combinatorics/permutations')

test("array.sorting.__selectPivotMedianOfThree", (t) => {
	const check = (values, expected) => {
		const before = [ 100, -100 ]
		const after = [ -100, 100, -100 ]
		const arr = [ ...before, ...values, ...after ]
		const start = before.length
		const end = start + values.length
		const mid = Math.floor((start + end) / 2)
		const last = end - 1
		const pivot = __selectPivotMedianOfThree(arr, start, end, compare)
		t.equal(pivot, expected)
		t.equal(arr[last], pivot)
		t.ok(arr[start] <= arr[last] && arr[last] <= arr[mid])
		t.equal(arr.slice(0, start), before)
		t.equal(arr.slice(end), after)
		t.equal(arr.slice(start, end).sort(sub), Array.from(values).sort(sub))
		for (let i = start; i < end; i++) {
			if (i !== start && i !== mid && i !== last && arr[i] !== values[i - start]) {
				t.fail({ values, arr })
			}
		}
	}

	check([ 7 ], 7)
	check([ 1, 2 ], 2)
	check([ 2, 1 ], 2)
	check([ 2, 2 ], 2)

	for (const [ a, b, c ] of permutations([ 1, 2, 3 ])) {
		check([ a, 9, 9, b, 0, 0, c ], 2)
		check([ a, 9, b, 0, c ], 2)
		check([ a, b, c ], 2)
		check([ a, 9, 9, b, 0, c ], 2)
	}

	check([ 1, 1, 2 ], 1)
	check([ 2, 1, 1 ], 1)
	check([ 2, 2, 1 ], 2)
	check([ 5, 5, 5 ], 5)
})
