const { test } = require('@kmamal/testing')
const { __partitionByLomuto } = require('./partition-by-lomuto')
const { compare } = require('../../../function/compare')
const { sub } = require('../../../operators')
const { create } = require('../../create')
const { MiddleSquareWeyl } = require('../../../random/seeded/middle-square-weyl')

test("array.sorting.__partitionByLomuto", (t) => {
	const rng = new MiddleSquareWeyl(5)

	const check = (values) => {
		const before = [ 100, -100, 100 ]
		const after = [ -100, 100 ]
		const arr = [ ...before, ...values, ...after ]
		const start = before.length
		const end = start + values.length
		const pivot = arr[end - 1]
		const index = __partitionByLomuto(arr, start, end, pivot, compare)
		t.ok(index >= start && index < end)
		t.equal(arr[index], pivot)
		t.equal(arr.slice(0, start), before)
		t.equal(arr.slice(end), after)
		const range = arr.slice(start, end)
		t.equal(Array.from(range).sort(sub), Array.from(values).sort(sub))
		for (let i = start; i < index; i++) {
			if (arr[i] >= pivot) { t.fail({ values, pivot, index, arr }) }
		}
		for (let i = index + 1; i < end; i++) {
			if (arr[i] < pivot) { t.fail({ values, pivot, index, arr }) }
		}
		return index - start
	}

	t.equal(check([ 3 ]), 0)
	t.equal(check([ 1, 2 ]), 1)
	t.equal(check([ 2, 1 ]), 0)
	t.equal(check([ 5, 1, 4, 2, 3 ]), 2)
	t.equal(check([ 3, 3, 3 ]), 0)

	for (let length = 1; length <= 40; length++) {
		check(create(length, () => Math.floor(rng.uniform() * 10)))
	}
})

test("array.sorting.__partitionByLomuto empty range", (t) => {
	const arr = [ 1, 2, 3 ]
	t.equal(__partitionByLomuto(arr, 2, 2, 0, compare), 2)
	t.equal(arr, [ 1, 2, 3 ])
})
