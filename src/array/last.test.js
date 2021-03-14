const { test } = require('@xyz/testing')
const { last } = require('./last')

test("array.last", (t) => {
	t.equal(last([]), undefined)
	t.equal(last([ 1 ]), 1)
	t.equal(last([ 2, 1, 3 ]), 3)
})
