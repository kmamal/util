const { test } = require('@xyz/testing')
const { concat } = require('.')

test('iterable.concat', (t) => {
	t.equal([ ...concat([]) ], [])
	t.equal([ ...concat([ [], [], [] ]) ], [])
	t.equal([ ...concat([ [ 1, 2, 3 ] ]) ], [ 1, 2, 3 ])
	t.equal([ ...concat([ [ 1 ], [ 2 ], [ 3 ] ]) ], [ 1, 2, 3 ])
	t.equal([ ...concat([ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]) ], [ 1, 2, 3, 4, 5, 6 ])
})
