const { test } = require('@kmamal/testing')
const { __partitionByHoare } = require('./partition-by-hoare')
const { compare } = require('../../../function/compare')
const { sub } = require('../../../operators')
const { create } = require('../../create')
const { MiddleSquareWeyl } = require('../../../random/seeded/middle-square-weyl')

test("array.sorting.__partitionByHoare", (t) => {
	const rng = new MiddleSquareWeyl(4)

	const check = (values, pivot) => {
		const before = [ 100, -100, 100 ]
		const after = [ -100, 100 ]
		const arr = [ ...before, ...values, ...after ]
		const start = before.length
		const end = start + values.length
		const index = __partitionByHoare(arr, start, end, pivot, compare)
		t.ok(index >= start && index <= end)
		t.equal(arr.slice(0, start), before)
		t.equal(arr.slice(end), after)
		const range = arr.slice(start, end)
		t.equal(Array.from(range).sort(sub), Array.from(values).sort(sub))
		for (let i = start; i < index; i++) {
			if (arr[i] > pivot) { t.fail({ values, pivot, index, arr }) }
		}
		for (let i = index; i < end; i++) {
			if (arr[i] < pivot) { t.fail({ values, pivot, index, arr }) }
		}
	}

	t.equal(__partitionByHoare([ 1, 2, 3 ], 1, 1, 2, compare), 1)
	check([], 5)
	check([ 3 ], 3)
	check([ 3 ], 1)
	check([ 3 ], 5)
	check([ 2, 1 ], 1)
	check([ 2, 1 ], 2)
	check([ 5, 1, 4, 2, 3 ], 3)

	for (let length = 1; length <= 40; length++) {
		const values = create(length, () => Math.floor(rng.uniform() * 10))
		check(values, values[Math.floor(rng.uniform() * length)])
		check(values, 4.5)
		check(values, -1)
		check(values, 11)
	}
})
