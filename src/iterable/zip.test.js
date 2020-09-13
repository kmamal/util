const { test } = require('@xyz/tests')
const { zip } = require('.')

test('iterable.zip', (t) => {
	t.equal([ ...zip([]) ], [])
	t.equal([ ...zip([ [] ]) ], [])
	t.equal([ ...zip([ [], [] ]) ], [])
	t.equal([ ...zip([ [ 1, 2, 3 ], [ 4, 5, 6 ] ]) ], [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ])
	t.equal([ ...zip([ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]) ], [ [ 1, 3, 5 ], [ 2, 4, 6 ] ])
	t.equal([ ...zip([ [ 1, 2, 3 ], [ 4, 5 ] ]) ], [ [ 1, 4 ], [ 2, 5 ], [ 3, undefined ] ])
})
