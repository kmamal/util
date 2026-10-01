const { test } = require('@kmamal/testing')
const { __min, min, minBy, minIndex, minIndexBy } = require('./min')
const { compare } = require('../function/compare')

test("array.min", (t) => {
	t.equal(min([]), undefined)
	t.equal(min([ 1 ]), 1)
	t.equal(min([ 2, 1, 3 ]), 1)
})

test("array.minBy", (t) => {
	t.equal(minBy([], (x) => -x), undefined)
	t.equal(minBy([ 1 ], (x) => -x), 1)
	t.equal(minBy([ 2, 1, 3 ], (x) => -x), 3)
})

test("array.minIndex", (t) => {
	t.equal(minIndex([]), -1)
	t.equal(minIndex([ 1 ]), 0)
	t.equal(minIndex([ 2, 1, 3 ]), 1)
})

test("array.minIndexBy", (t) => {
	t.equal(minIndexBy([], (x) => -x), -1)
	t.equal(minIndexBy([ 1 ], (x) => -x), 0)
	t.equal(minIndexBy([ 2, 1, 3 ], (x) => -x), 2)
})

test("array.__min", (t) => {
	const arr = [ 0, 9, 5, 2, 7, 2, 0 ]
	const copy = Array.from(arr)
	const call = (start, end, fnCmp = compare) => {
		const { item, index } = __min(arr, start, end, fnCmp)
		return { item, index }
	}

	t.equal(call(1, 6), { item: 2, index: 3 })
	t.equal(call(2, 3), { item: 5, index: 2 })
	t.equal(call(5, 6), { item: 2, index: 5 })
	t.equal(call(3, 3), { item: undefined, index: -1 })
	t.equal(call(1, 6, (a, b) => b - a), { item: 9, index: 1 })
	t.equal(call(2, 6, (a, b) => b - a), { item: 7, index: 4 })
	t.equal(arr, copy)
})
