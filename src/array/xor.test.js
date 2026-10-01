const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const {
	__xor,
	__xorSorted,
	xorWith,
	xorBy,
	xor,
	xorWithSorted,
	xorBySorted,
	xorSorted,
} = require('./xor')
const { eq } = require('../operators/comparison/eq')
const { compare } = require('../function/compare')

const tens = (x) => Math.floor(x / 10)
const options = { $$$: null }

testVariants("array.xor", xor, (t, f) => {
	t.equal(f([], []), [])
	t.equal(f([], [ 1 ]), [ 1 ])
	t.equal(f([ 1 ], []), [ 1 ])
	t.equal(f([ 1, 3, 2 ], []), [ 1, 3, 2 ])
	t.equal(f([], [ 1, 3, 2 ]), [ 1, 3, 2 ])
	t.equal(f([ 1, 2, 3 ], [ 2, 4 ]), [ 1, 3, 4 ])
	t.equal(f([ 1, 3, 2, 5 ], [ 3, 2, 4 ]), [ 1, 5, 4 ])
	t.equal(f([ 1, 1 ], [ 1 ]), [])
	t.equal(f([ 1, 1, 2 ], [ 2, 3, 3 ]), [ 1, 1, 3, 3 ])
}, options)

testVariants("array.xorBy", xorBy, (t, f) => {
	t.equal(f([], [], (x) => 2 * x), [])
	t.equal(f([], [ 1 ], (x) => 2 * x), [ 1 ])
	t.equal(f([ 1 ], [], (x) => 2 * x), [ 1 ])
	t.equal(f([ 1, 3, 2 ], [], (x) => 2 * x), [ 1, 3, 2 ])
	t.equal(f([], [ 1, 3, 2 ], (x) => 2 * x), [ 1, 3, 2 ])
	t.equal(f([ 1, 3, 2, 5 ], [ 3, 2, 4 ], (x) => 2 * x), [ 1, 5, 4 ])
	t.equal(f([ 1, 12, 25 ], [ 15, 23, 31 ], tens), [ 1, 31 ])
}, options)

testVariants("array.xorWith", xorWith, (t, f) => {
	t.equal(f([], [], (a, b) => a === b), [])
	t.equal(f([], [ 1 ], (a, b) => a === b), [ 1 ])
	t.equal(f([ 1 ], [], (a, b) => a === b), [ 1 ])
	t.equal(f([ 1, 3, 2, 5 ], [ 3, 2, 4 ], (a, b) => a === b), [ 1, 5, 4 ])
	t.equal(f([ 1, 12, 25 ], [ 15, 23, 31 ], (a, b) => tens(a) === tens(b)), [ 1, 31 ])
}, options)

testVariants("array.xorSorted", xorSorted, (t, f) => {
	t.equal(f([], []), [])
	t.equal(f([], [ 1 ]), [ 1 ])
	t.equal(f([ 1 ], []), [ 1 ])
	t.equal(f([ 1, 2, 3 ], []), [ 1, 2, 3 ])
	t.equal(f([], [ 1, 2, 3 ]), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 3 ], [ 2, 4 ]), [ 1, 3, 4 ])
	t.equal(f([ 1, 2, 3, 5 ], [ 2, 3, 4 ]), [ 1, 4, 5 ])
	t.equal(f([ 1, 1 ], [ 1 ]), [])
	t.equal(f([ 1, 1, 2 ], [ 2, 3, 3 ]), [ 1, 1, 3, 3 ])
}, options)

testVariants("array.xorBySorted", xorBySorted, (t, f) => {
	t.equal(f([], [], (x) => 2 * x), [])
	t.equal(f([], [ 1 ], (x) => 2 * x), [ 1 ])
	t.equal(f([ 1 ], [], (x) => 2 * x), [ 1 ])
	t.equal(f([ 1, 2, 3 ], [], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(f([], [ 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 3, 5 ], [ 2, 3, 4 ], (x) => 2 * x), [ 1, 4, 5 ])
	t.equal(f([ 1, 12, 25 ], [ 15, 23, 31 ], tens), [ 1, 31 ])
}, options)

testVariants("array.xorWithSorted", xorWithSorted, (t, f) => {
	t.equal(f([], [], (a, b) => a - b), [])
	t.equal(f([], [ 1 ], (a, b) => a - b), [ 1 ])
	t.equal(f([ 1 ], [], (a, b) => a - b), [ 1 ])
	t.equal(f([ 1, 2, 3, 5 ], [ 2, 3, 4 ], (a, b) => a - b), [ 1, 4, 5 ])
	t.equal(f([ 5, 3, 2, 1 ], [ 4, 3, 2 ], (a, b) => b - a), [ 5, 4, 1 ])
	t.equal(f([ 1, 12, 25 ], [ 15, 23, 31 ], (a, b) => tens(a) - tens(b)), [ 1, 31 ])
}, options)

test("array.__xor", (t) => {
	const a = [ 3, 1, 2, 2, 4 ]
	const b = [ 1, 1, 2, 4, 4, 5, 3 ]
	const call = (fn, aStart, aEnd, bStart, bEnd, fnCmp) => {
		const dst = [ 'y', 'y', 'y', 'y', 'y', 'y', 'y' ]
		const count = fn(dst, 2, a, aStart, aEnd, b, bStart, bEnd, fnCmp)
		return { count, dst }
	}

	t.equal(call(__xor, 1, 4, 2, 5, eq), { count: 3, dst: [ 'y', 'y', 1, 4, 4, 'y', 'y' ] })
	t.equal(call(__xor, 1, 4, 2, 5, eq).dst.slice(2, 5), xor(a.slice(1, 4), b.slice(2, 5)))
	t.equal(call(__xor, 2, 4, 2, 3, eq), { count: 0, dst: [ 'y', 'y', 'y', 'y', 'y', 'y', 'y' ] })
	t.equal(call(__xor, 1, 2, 0, 3, eq), { count: 1, dst: [ 'y', 'y', 2, 'y', 'y', 'y', 'y' ] })
	t.equal(call(__xor, 2, 2, 3, 5, eq), { count: 2, dst: [ 'y', 'y', 4, 4, 'y', 'y', 'y' ] })
	t.equal(call(__xor, 0, 2, 4, 4, eq), { count: 2, dst: [ 'y', 'y', 3, 1, 'y', 'y', 'y' ] })
	t.equal(call(__xor, 2, 2, 4, 4, eq), { count: 0, dst: [ 'y', 'y', 'y', 'y', 'y', 'y', 'y' ] })
	t.equal(a, [ 3, 1, 2, 2, 4 ])
	t.equal(b, [ 1, 1, 2, 4, 4, 5, 3 ])
})

test("array.__xorSorted", (t) => {
	const a = [ 0, 1, 2, 2, 5, 9 ]
	const b = [ 1, 2, 3, 5, 5, 6, 9 ]
	const call = (aStart, aEnd, bStart, bEnd) => {
		const dst = [ 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'y' ]
		const count = __xorSorted(dst, 2, a, aStart, aEnd, b, bStart, bEnd, compare)
		return { count, dst }
	}

	t.equal(call(1, 5, 1, 6), { count: 3, dst: [ 'y', 'y', 1, 3, 6, 'y', 'y', 'y' ] })
	t.equal(call(1, 5, 1, 6).dst.slice(2, 5), xorSorted(a.slice(1, 5), b.slice(1, 6)))
	t.equal(call(2, 4, 1, 2), { count: 0, dst: [ 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'y' ] })
	t.equal(call(2, 5, 3, 5), { count: 2, dst: [ 'y', 'y', 2, 2, 'y', 'y', 'y', 'y' ] })
	t.equal(call(4, 6, 3, 7), { count: 1, dst: [ 'y', 'y', 6, 'y', 'y', 'y', 'y', 'y' ] })
	t.equal(call(3, 3, 2, 4), { count: 2, dst: [ 'y', 'y', 3, 5, 'y', 'y', 'y', 'y' ] })
	t.equal(call(1, 3, 4, 4), { count: 2, dst: [ 'y', 'y', 1, 2, 'y', 'y', 'y', 'y' ] })
	t.equal(call(3, 3, 4, 4), { count: 0, dst: [ 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'y' ] })
	t.equal(a, [ 0, 1, 2, 2, 5, 9 ])
	t.equal(b, [ 1, 2, 3, 5, 5, 6, 9 ])
})
