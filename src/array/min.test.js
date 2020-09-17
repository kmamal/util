const { test } = require('@xyz/testing')
const { min } = require('.')

test('array.min', (t) => {
	t.equal(min([]), undefined)
	t.equal(min([ 1 ]), 1)
	t.equal(min([ 2, 1, 3 ]), 1)
})
