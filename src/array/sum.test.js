const { test } = require('@xyz/testing')
const { sum } = require('.')

test("array.sum", (t) => {
	t.equal(sum([]), 0)
	t.equal(sum([ 1 ]), 1)
	t.equal(sum([ 1, 2, 3 ]), 6)
})
