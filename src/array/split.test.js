const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __split, splitWith, splitBy, split } = require('./split')
const { eq } = require('../operators/comparison/eq')

const square = (x) => x * x

testVariants("array.split", split, (t, f) => {
	t.equal(f([], 1), [ [] ])
	t.equal(f([ 1 ], 1), [ [], [] ])
	t.equal(f([ 1, 2, 3 ], 1), [ [], [ 2, 3 ] ])
	t.equal(f([ 1, 2, 3 ], 2), [ [ 1 ], [ 3 ] ])
	t.equal(f([ 1, 2, 3 ], 3), [ [ 1, 2 ], [] ])
	t.equal(f([ 1, 2, 3 ], 4), [ [ 1, 2, 3 ] ])
})

testVariants("array.splitBy", splitBy, (t, f) => {
	t.equal(f([], 1, square), [ [] ])
	t.equal(f([ 2 ], 4, square), [ [], [] ])
	t.equal(f([ 2, 3, 4 ], 4, square), [ [], [ 3, 4 ] ])
	t.equal(f([ 2, 3, 4 ], 9, square), [ [ 2 ], [ 4 ] ])
	t.equal(f([ 2, 3, 4 ], 16, square), [ [ 2, 3 ], [] ])
	t.equal(f([ 2, 3, 4 ], 1, square), [ [ 2, 3, 4 ] ])
})

testVariants("array.splitWith", splitWith, (t, f) => {
	t.equal(f([], null, () => false), [ [] ])
	t.equal(f([ 1 ], null, () => true), [ [], [] ])
	t.equal(f([ 1, 2, 3 ], null, (x) => x === 1), [ [], [ 2, 3 ] ])
	t.equal(f([ 1, 2, 3 ], null, (x) => x === 2), [ [ 1 ], [ 3 ] ])
	t.equal(f([ 1, 2, 3 ], null, (x) => x === 3), [ [ 1, 2 ], [] ])
	t.equal(f([ 1, 2, 3 ], null, (x) => x === 4), [ [ 1, 2, 3 ] ])
})

test("array.__split", (t) => {
	const src = [ 0, 1, 0, 2, 3, 0, 0 ]
	const call = (srcStart, srcEnd) => {
		const dst = [ 'y', 'y', 'y', 'y', 'y', 'y' ]
		const count = __split(dst, 2, src, srcStart, srcEnd, 0, eq)
		return { count, dst }
	}

	t.equal(call(1, 6), { count: 3, dst: [ 'y', 'y', [ 1 ], [ 2, 3 ], [], 'y' ] })
	t.equal(call(1, 6).dst.slice(2, 5), split(src.slice(1, 6), 0))
	t.equal(call(1, 5), { count: 2, dst: [ 'y', 'y', [ 1 ], [ 2, 3 ], 'y', 'y' ] })
	t.equal(call(3, 5), { count: 1, dst: [ 'y', 'y', [ 2, 3 ], 'y', 'y', 'y' ] })
	t.equal(call(3, 4), { count: 1, dst: [ 'y', 'y', [ 2 ], 'y', 'y', 'y' ] })
	t.equal(call(2, 3), { count: 2, dst: [ 'y', 'y', [], [], 'y', 'y' ] })
	t.equal(call(3, 3), { count: 1, dst: [ 'y', 'y', [], 'y', 'y', 'y' ] })
	t.equal(src, [ 0, 1, 0, 2, 3, 0, 0 ])
})
