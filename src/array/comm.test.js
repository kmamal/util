const { test } = require('@xyz/testing')
const { comm } = require('.')

test('array.comm', (t) => {
	t.equal(comm([], []), { a: [], ab: [], b: [] })
	t.equal(comm([ 1 ], []), { a: [ 1 ], ab: [], b: [] })
	t.equal(comm([], [ 1 ]), { a: [], ab: [], b: [ 1 ] })
	t.equal(comm([ 1 ], [ 1 ]), { a: [], ab: [ 1 ], b: [] })
	t.equal(comm([ 1 ], [ 2 ]), { a: [ 1 ], ab: [], b: [ 2 ] })
	t.equal(comm([ 1, 2, 3 ], []), { a: [ 1, 2, 3 ], ab: [], b: [] })
	t.equal(comm([], [ 1, 2, 3 ]), { a: [], ab: [], b: [ 1, 2, 3 ] })
	t.equal(comm([ 1, 2, 3 ], [ 2, 3, 4 ]), { a: [ 1 ], ab: [ 2, 3 ], b: [ 4 ] })
})
