const { test } = require('@xyz/testing')
const { merge, mergeBy, mergeByPure } = require('./merge')

test("array.merge", (t) => {
	t.equal(merge([], []), [])
	t.equal(merge([ 1, 2, 3 ], []), [ 1, 2, 3 ])
	t.equal(merge([], [ 1, 2, 3 ]), [ 1, 2, 3 ])
	t.equal(merge([ 1 ], [ 2 ]), [ 1, 2 ])
	t.equal(merge([ 2 ], [ 1 ]), [ 1, 2 ])
	t.equal(merge([ 1, 3, 5 ], [ 2, 4, 6 ]), [ 1, 2, 3, 4, 5, 6 ])
	t.equal(merge([ 2, 4, 6 ], [ 1, 3, 5 ]), [ 1, 2, 3, 4, 5, 6 ])
})

test("array.mergeBy", (t) => {
	t.equal(mergeBy([], [], (x) => 2 * x), [])
	t.equal(mergeBy([ 1, 2, 3 ], [], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(mergeBy([], [ 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(mergeBy([ 1 ], [ 2 ], (x) => 2 * x), [ 1, 2 ])
	t.equal(mergeBy([ 2 ], [ 1 ], (x) => 2 * x), [ 1, 2 ])
	t.equal(mergeBy([ 1, 3, 5 ], [ 2, 4, 6 ], (x) => 2 * x), [ 1, 2, 3, 4, 5, 6 ])
	t.equal(mergeBy([ 2, 4, 6 ], [ 1, 3, 5 ], (x) => 2 * x), [ 1, 2, 3, 4, 5, 6 ])
})

test("array.mergeByPure", (t) => {
	t.equal(mergeByPure([], [], (x) => 2 * x), [])
	t.equal(mergeByPure([ 1, 2, 3 ], [], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(mergeByPure([], [ 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(mergeByPure([ 1 ], [ 2 ], (x) => 2 * x), [ 1, 2 ])
	t.equal(mergeByPure([ 2 ], [ 1 ], (x) => 2 * x), [ 1, 2 ])
	t.equal(mergeByPure([ 1, 3, 5 ], [ 2, 4, 6 ], (x) => 2 * x), [ 1, 2, 3, 4, 5, 6 ])
	t.equal(mergeByPure([ 2, 4, 6 ], [ 1, 3, 5 ], (x) => 2 * x), [ 1, 2, 3, 4, 5, 6 ])
})
