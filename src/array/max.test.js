const { test } = require('@kmamal/testing')
const { max, maxBy, maxIndex, maxIndexBy } = require('./max')

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
