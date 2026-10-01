const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const {
	__difference,
	differenceWith,
	differenceBy,
	difference,
	differenceWithSorted,
	differenceBySorted,
	differenceSorted,
} = require('./difference')

const eq = (x, y) => x === y
const cmp = (x, y) => x - y
const group = (x) => Math.floor(x / 10)
const eqGroup = (x, y) => group(x) === group(y)
const cmpGroup = (x, y) => group(x) - group(y)

testVariants("array.differenceWith", differenceWith, (t, f) => {
	t.equal(f([], [], eq), [])
	t.equal(f([], [ 1 ], eq), [])
	t.equal(f([ 1 ], [], eq), [ 1 ])
	t.equal(f([ 1, 2, 3 ], [], eq), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 3 ], [ 2 ], eq), [ 1, 3 ])
	t.equal(f([ 1, 2, 3 ], [ 2, 3, 4 ], eq), [ 1 ])
	t.equal(f([ 1, 1, 2 ], [ 1 ], eq), [ 2 ])
	t.equal(f([ 1, 12, 25 ], [ 15, 23, 31 ], eqGroup), [ 1 ])
	t.equal(f([ 11, 12, 13 ], [ 15 ], eqGroup), [])
})

testVariants("array.differenceBy", differenceBy, (t, f) => {
	t.equal(f([], [], (x) => 2 * x), [])
	t.equal(f([], [ 1 ], (x) => 2 * x), [])
	t.equal(f([ 1 ], [], (x) => 2 * x), [ 1 ])
	t.equal(f([ 1, 2, 3 ], [], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 3 ], [ 2, 3, 4 ], (x) => 2 * x), [ 1 ])
	t.equal(f([ 1, 12, 25 ], [ 15, 23, 31 ], group), [ 1 ])
	t.equal(f([ 11, 12, 13 ], [ 15 ], group), [])
})

testVariants("array.difference", difference, (t, f) => {
	t.equal(f([], []), [])
	t.equal(f([], [ 1 ]), [])
	t.equal(f([ 1 ], []), [ 1 ])
	t.equal(f([ 1, 2, 3 ], []), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 3 ], [ 2 ]), [ 1, 3 ])
	t.equal(f([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 1 ])
	t.equal(f([ 1, 1, 2 ], [ 1 ]), [ 2 ])
	t.equal(f([ 1, 1, 2 ], [ 1, 1, 1 ]), [ 2 ])
})

testVariants("array.differenceWithSorted", differenceWithSorted, (t, f) => {
	t.equal(f([], [], cmp), [])
	t.equal(f([], [ 1 ], cmp), [])
	t.equal(f([ 1 ], [], cmp), [ 1 ])
	t.equal(f([ 1, 2, 3 ], [], cmp), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 3 ], [ 2 ], cmp), [ 1, 3 ])
	t.equal(f([ 1, 2, 3 ], [ 2, 3, 4 ], cmp), [ 1 ])
	t.equal(f([ 1, 2, 2, 3 ], [ 2, 2, 2 ], cmp), [ 1, 3 ])
	t.equal(f([ 1, 12, 25 ], [ 15, 23, 31 ], cmpGroup), [ 1 ])
	t.equal(f([ 11, 12, 13 ], [ 15 ], cmpGroup), [])
})

testVariants("array.differenceBySorted", differenceBySorted, (t, f) => {
	t.equal(f([], [], (x) => 2 * x), [])
	t.equal(f([], [ 1 ], (x) => 2 * x), [])
	t.equal(f([ 1 ], [], (x) => 2 * x), [ 1 ])
	t.equal(f([ 1, 2, 3 ], [], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 3 ], [ 2, 3, 4 ], (x) => 2 * x), [ 1 ])
	t.equal(f([ 1, 12, 25 ], [ 15, 23, 31 ], group), [ 1 ])
	t.equal(f([ 11, 12, 13 ], [ 15 ], group), [])
})

testVariants("array.differenceSorted", differenceSorted, (t, f) => {
	t.equal(f([], []), [])
	t.equal(f([], [ 1 ]), [])
	t.equal(f([ 1 ], []), [ 1 ])
	t.equal(f([ 1, 2, 3 ], []), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 3 ], [ 2 ]), [ 1, 3 ])
	t.equal(f([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 1 ])
	t.equal(f([ 1, 1, 2 ], [ 1 ]), [ 2 ])
	t.equal(f([ 1, 1, 2, 2, 3 ], [ 1, 1, 2 ]), [ 3 ])
	t.equal(f([ 1, 2, 2, 3 ], [ 2, 2, 2 ]), [ 1, 3 ])
})

test("array.__difference", (t) => {
	{
		const a = [ 'p', 1, 2, 2, 3, 4, 'q' ]
		const b = [ 1, 'r', 2, 5, 'r', 4 ]
		const dst = [ 'x', 'x', 'x', 'x', 'x', 'x' ]
		const n = __difference(dst, 2, a, 1, 6, b, 1, 4, eq)
		t.equal(n, 3)
		t.equal(dst, [ 'x', 'x', 1, 3, 4, 'x' ])
		t.equal(dst.slice(2, 2 + n), difference(a.slice(1, 6), b.slice(1, 4)))
		t.equal(a, [ 'p', 1, 2, 2, 3, 4, 'q' ])
		t.equal(b, [ 1, 'r', 2, 5, 'r', 4 ])
	}

	{
		const dst = [ 'x', 'x', 'x' ]
		t.equal(__difference(dst, 1, [ 0, 2, 2, 2, 0 ], 1, 4, [ 0, 2, 0 ], 1, 2, eq), 0)
		t.equal(dst, [ 'x', 'x', 'x' ])
	}

	{
		const dst = [ 'x', 'x', 'x', 'x' ]
		t.equal(__difference(dst, 1, [ 11, 12, 25, 31 ], 1, 4, [ 15, 23, 35 ], 0, 2, eqGroup), 1)
		t.equal(dst, [ 'x', 31, 'x', 'x' ])
	}

	{
		const dst = [ 'x', 'x', 'x', 'x' ]
		t.equal(__difference(dst, 1, [ 0, 1, 2, 0 ], 1, 3, [ 1, 2 ], 1, 1, eq), 2)
		t.equal(dst, [ 'x', 1, 2, 'x' ])
	}

	{
		const dst = [ 'x', 'x', 'x' ]
		t.equal(__difference(dst, 1, [ 0, 1, 0 ], 1, 2, [ 2 ], 0, 1, eq), 1)
		t.equal(dst, [ 'x', 1, 'x' ])
	}

	{
		const dst = [ 'x', 'x' ]
		t.equal(__difference(dst, 1, [ 1, 2 ], 1, 1, [ 3 ], 0, 1, eq), 0)
		t.equal(dst, [ 'x', 'x' ])
	}
})
