const { test } = require('@xyz/testing')
const { nth } = require('.')

test("array.nth", (t) => {
	t.equal(nth([], 0), undefined)
	t.equal(nth([ 1 ], 0), 1)
	t.equal(nth([ 1 ], 1), undefined)
	t.equal(nth([ 2, 1, 3 ], 0), 2)
	t.equal(nth([ 2, 1, 3 ], 1), 1)
	t.equal(nth([ 2, 1, 3 ], 2), 3)
	t.equal(nth([ 2, 1, 3 ], 3), undefined)
})
