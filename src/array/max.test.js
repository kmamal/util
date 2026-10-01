const { test } = require('@kmamal/testing')
const { __max, max, maxBy, maxIndex, maxIndexBy } = require('./max')
const { compare } = require('../function/compare')

test("array.max", (t) => {
	t.equal(max([]), undefined)
	t.equal(max([ 1 ]), 1)
	t.equal(max([ 2, 1, 3 ]), 3)
})

test("array.maxBy", (t) => {
	t.equal(maxBy([], (x) => -x), undefined)
	t.equal(maxBy([ 1 ], (x) => -x), 1)
	t.equal(maxBy([ 2, 1, 3 ], (x) => -x), 1)
})

test("array.maxIndex", (t) => {
	t.equal(maxIndex([]), -1)
	t.equal(maxIndex([ 1 ]), 0)
	t.equal(maxIndex([ 2, 1, 3 ]), 2)
})

test("array.maxIndexBy", (t) => {
	t.equal(maxIndexBy([], (x) => -x), -1)
	t.equal(maxIndexBy([ 1 ], (x) => -x), 0)
	t.equal(maxIndexBy([ 2, 1, 3 ], (x) => -x), 1)
})

test("array.__max", (t) => {
	const arr = [ 9, 0, 3, 7, 5, 7, 9 ]
	const copy = Array.from(arr)
	const call = (start, end, fnCmp = compare) => {
		const { item, index } = __max(arr, start, end, fnCmp)
		return { item, index }
	}

	t.equal(call(1, 6), { item: 7, index: 3 })
	t.equal(call(2, 3), { item: 3, index: 2 })
	t.equal(call(5, 6), { item: 7, index: 5 })
	t.equal(call(3, 3), { item: undefined, index: -1 })
	t.equal(call(1, 6, (a, b) => b - a), { item: 0, index: 1 })
	t.equal(call(2, 6, (a, b) => b - a), { item: 3, index: 2 })
	t.equal(arr, copy)
})
