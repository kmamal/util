const { test } = require('@kmamal/testing')
const { comm, commBy } = require('./comm')

test("array.comm", (t) => {
	t.equal(comm([], []), { a: [], ab: [], b: [], x: [] })
	t.equal(comm([ 1 ], []), { a: [ 1 ], ab: [], b: [], x: [ 1 ] })
	t.equal(comm([], [ 1 ]), { a: [], ab: [], b: [ 1 ], x: [ 1 ] })
	t.equal(comm([ 1 ], [ 1 ]), { a: [], ab: [ 1 ], b: [], x: [] })
	t.equal(comm([ 1 ], [ 2 ]), { a: [ 1 ], ab: [], b: [ 2 ], x: [ 1, 2 ] })
	t.equal(comm([ 1, 2, 3 ], []), { a: [ 1, 2, 3 ], ab: [], b: [], x: [ 1, 2, 3 ] })
	t.equal(comm([], [ 1, 2, 3 ]), { a: [], ab: [], b: [ 1, 2, 3 ], x: [ 1, 2, 3 ] })
	t.equal(comm([ 1, 2, 3 ], [ 2, 3, 4 ]), { a: [ 1 ], ab: [ 2, 3 ], b: [ 4 ], x: [ 1, 4 ] })
})

test("array.commBy", (t) => {
	t.equal(commBy([], [], (x) => 2 * x), { a: [], ab: [], b: [], x: [] })
	t.equal(commBy([ 1 ], [], (x) => 2 * x), { a: [ 1 ], ab: [], b: [], x: [ 1 ] })
	t.equal(commBy([], [ 1 ], (x) => 2 * x), { a: [], ab: [], b: [ 1 ], x: [ 1 ] })
	t.equal(commBy([ 1 ], [ 1 ], (x) => 2 * x), { a: [], ab: [ 1 ], b: [], x: [] })
	t.equal(commBy([ 1 ], [ 2 ], (x) => 2 * x), { a: [ 1 ], ab: [], b: [ 2 ], x: [ 1, 2 ] })
	t.equal(commBy([ 1, 2, 3 ], [], (x) => 2 * x), { a: [ 1, 2, 3 ], ab: [], b: [], x: [ 1, 2, 3 ] })
	t.equal(commBy([], [ 1, 2, 3 ], (x) => 2 * x), { a: [], ab: [], b: [ 1, 2, 3 ], x: [ 1, 2, 3 ] })
	t.equal(commBy([ 1, 2, 3 ], [ 2, 3, 4 ], (x) => 2 * x), { a: [ 1 ], ab: [ 2, 3 ], b: [ 4 ], x: [ 1, 4 ] })
})
