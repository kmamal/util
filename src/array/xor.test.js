const { test } = require('@kmamal/testing')
const {
	xor,
	xorSorted,
	xorBy,
	xorBySorted,
	xorByPure,
	xorByPureSorted,
} = require('./xor')

test("array.xor", (t) => {
	t.equal(xor([], []), [])
	t.equal(xor([], [ 1 ]), [ 1 ])
	t.equal(xor([ 1 ], []), [ 1 ])
	t.equal(xor([ 1, 3, 2 ], []), [ 1, 3, 2 ])
	t.equal(xor([], [ 1, 3, 2 ]), [ 1, 3, 2 ])
	t.equal(xor([ 1, 3, 2, 5 ], [ 3, 2, 4 ]), [ 1, 5, 4 ])
})

test("array.xorSorted", (t) => {
	t.equal(xorSorted([], []), [])
	t.equal(xorSorted([], [ 1 ]), [ 1 ])
	t.equal(xorSorted([ 1 ], []), [ 1 ])
	t.equal(xorSorted([ 1, 2, 3 ], []), [ 1, 2, 3 ])
	t.equal(xorSorted([], [ 1, 2, 3 ]), [ 1, 2, 3 ])
	t.equal(xorSorted([ 1, 2, 3, 5 ], [ 2, 3, 4 ]), [ 1, 4, 5 ])
})

test("array.xorBy", (t) => {
	t.equal(xorBy([], [], (x) => 2 * x), [])
	t.equal(xorBy([], [ 1 ], (x) => 2 * x), [ 1 ])
	t.equal(xorBy([ 1 ], [], (x) => 2 * x), [ 1 ])
	t.equal(xorBy([ 1, 3, 2 ], [], (x) => 2 * x), [ 1, 3, 2 ])
	t.equal(xorBy([], [ 1, 3, 2 ], (x) => 2 * x), [ 1, 3, 2 ])
	t.equal(xorBy([ 1, 3, 2, 5 ], [ 3, 2, 4 ], (x) => 2 * x), [ 1, 5, 4 ])
})

test("array.xorBySorted", (t) => {
	t.equal(xorBySorted([], [], (x) => 2 * x), [])
	t.equal(xorBySorted([], [ 1 ], (x) => 2 * x), [ 1 ])
	t.equal(xorBySorted([ 1 ], [], (x) => 2 * x), [ 1 ])
	t.equal(xorBySorted([ 1, 2, 3 ], [], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(xorBySorted([], [ 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(xorBySorted([ 1, 2, 3, 5 ], [ 2, 3, 4 ], (x) => 2 * x), [ 1, 4, 5 ])
})

test("array.xorByPure", (t) => {
	t.equal(xorByPure([], [], (x) => 2 * x), [])
	t.equal(xorByPure([], [ 1 ], (x) => 2 * x), [ 1 ])
	t.equal(xorByPure([ 1 ], [], (x) => 2 * x), [ 1 ])
	t.equal(xorByPure([ 1, 3, 2 ], [], (x) => 2 * x), [ 1, 3, 2 ])
	t.equal(xorByPure([], [ 1, 3, 2 ], (x) => 2 * x), [ 1, 3, 2 ])
	t.equal(xorByPure([ 1, 3, 2, 5 ], [ 3, 2, 4 ], (x) => 2 * x), [ 1, 5, 4 ])
})

test("array.xorByPureSorted", (t) => {
	t.equal(xorByPureSorted([], [], (x) => 2 * x), [])
	t.equal(xorByPureSorted([], [ 1 ], (x) => 2 * x), [ 1 ])
	t.equal(xorByPureSorted([ 1 ], [], (x) => 2 * x), [ 1 ])
	t.equal(xorByPureSorted([ 1, 2, 3 ], [], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(xorByPureSorted([], [ 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(xorByPureSorted([ 1, 2, 3, 5 ], [ 2, 3, 4 ], (x) => 2 * x), [ 1, 4, 5 ])
})
