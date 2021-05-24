const { test } = require('@kmamal/testing')
const { min, minBy, minIndex, minIndexBy } = require('./min')

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
