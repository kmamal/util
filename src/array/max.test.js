const { test } = require('@xyz/testing')
const { max } = require('.')

test('array.max', (t) => {
	t.equal(max([]), undefined)
	t.equal(max([ 1 ]), 1)
	t.equal(max([ 2, 1, 3 ]), 3)
})
