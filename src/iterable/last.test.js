const { test } = require('@xyz/testing')
const { last } = require('.')

test('iterable.last', (t) => {
	t.equal([ ...last([]) ], [])
	t.equal([ ...last([ 1, 2, 3 ]) ], [ 3 ])
})
