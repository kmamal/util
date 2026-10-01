const { test } = require('@kmamal/testing')
const { __partitionLeftRight } = require('./partition-left-right')
const { compare } = require('../../../function/compare')
const { sub } = require('../../../operators')
const { create } = require('../../create')
const { MiddleSquareWeyl } = require('../../../random/seeded/middle-square-weyl')

test("array.sorting.__partitionLeftRight", (t) => {
	const rng = new MiddleSquareWeyl(6)

	const check = (values, pivot) => {
		const before = [ 100, -100, 100 ]
		const after = [ -100, 100 ]
		const arr = [ ...before, ...values, ...after ]
		const start = before.length
		const end = start + values.length
		const { left, right } = __partitionLeftRight(arr, start, end, pivot, compare)
		t.ok(start <= left && left <= right && right <= end)
		t.equal(arr.slice(0, start), before)
		t.equal(arr.slice(end), after)
		const range = arr.slice(start, end)
		t.equal(Array.from(range).sort(sub), Array.from(values).sort(sub))
		for (let i = start; i < left; i++) {
			if (!(arr[i] < pivot)) { t.fail({ values, pivot, left, right, arr }) }
		}
		for (let i = left; i < right; i++) {
			if (arr[i] !== pivot) { t.fail({ values, pivot, left, right, arr }) }
		}
		for (let i = right; i < end; i++) {
			if (!(arr[i] > pivot)) { t.fail({ values, pivot, left, right, arr }) }
		}
		return [ left - start, right - start ]
	}

	t.equal(check([], 1), [ 0, 0 ])
	t.equal(check([ 3 ], 3), [ 0, 1 ])
	t.equal(check([ 3 ], 1), [ 0, 0 ])
	t.equal(check([ 3 ], 5), [ 1, 1 ])
	t.equal(check([ 5, 3, 1, 3, 4, 2, 3 ], 3), [ 2, 5 ])
	t.equal(check([ 5, 1, 4, 2 ], 3), [ 2, 2 ])

	for (let length = 1; length <= 40; length++) {
		const values = create(length, () => Math.floor(rng.uniform() * 10))
		check(values, values[Math.floor(rng.uniform() * length)])
		check(values, 4.5)
	}
})
