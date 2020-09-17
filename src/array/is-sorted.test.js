const { test } = require('@xyz/testing')
const { isSorted } = require('.')

test('array.isSorted', (t) => {
	t.equal(isSorted([]), true)
	t.equal(isSorted([ 1 ]), true)
	t.equal(isSorted([ 1, 1 ]), true)
	t.equal(isSorted([ 1, 2 ]), true)
	t.equal(isSorted([ 2, 1 ]), false)
	t.equal(isSorted([ 1, 2, 3 ]), true)
	t.equal(isSorted([ 1, 3, 2 ]), false)
})
