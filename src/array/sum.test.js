const { test } = require('@kmamal/testing')
const { sum } = require('./sum')

test("array.sum", (t) => {
	t.equal(sum([]), 0)
	t.equal(sum([ 1 ]), 1)
	t.equal(sum([ 1, 2, 3 ]), 6)
})
