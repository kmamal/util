const { test } = require('@xyz/tests')
const { count } = require('.')

test('array.count', (t) => {
	t.equal(count([]), {})
	t.equal(count([ 1, 2, 3 ]), { 1: 1, 2: 1, 3: 1 })
	t.equal(count([ 1, 2, 3, 2, 1 ]), { 1: 2, 2: 2, 3: 1 })
})
