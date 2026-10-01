const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __unweave, unweave } = require('./unweave')

testVariants("array.unweave", unweave, (t, f) => {
	t.equal(f([], 0), [])
	t.equal(f([ 1, 2 ], 0), [])
	t.equal(f([], 1), [ [] ])
	t.equal(f([], 3), [ [], [], [] ])
	t.equal(f([ 1 ], 3), [ [ 1 ], [ ], [] ])
	t.equal(f([ 1, 2 ], 3), [ [ 1 ], [ 2 ], [] ])
	t.equal(f([ 1, 2, 3 ], 3), [ [ 1 ], [ 2 ], [ 3 ] ])
	t.equal(f([ 1, 2, 3, 4 ], 3), [ [ 1, 4 ], [ 2 ], [ 3 ] ])
	t.equal(f([ 1, 2, 3, 4, 5 ], 3), [ [ 1, 4 ], [ 2, 5 ], [ 3 ] ])
	t.equal(f([ 1, 2, 3, 4, 5, 6 ], 3), [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ])
	t.equal(f([ 1, 2, 3, 4, 5, 6 ], 2), [ [ 1, 3, 5 ], [ 2, 4, 6 ] ])
	t.equal(f([ 1, 2, 3, 4, 5, 6 ], 1), [ [ 1, 2, 3, 4, 5, 6 ] ])
	t.equal(f([ 1, 2, 3, 4, 5, 6 ], 4), [ [ 1, 5 ], [ 2, 6 ], [ 3 ], [ 4 ] ])
	t.equal(f([ 1, 2, 3, 4, 5, 6 ], 5), [ [ 1, 6 ], [ 2 ], [ 3 ], [ 4 ], [ 5 ] ])
})

test("array.__unweave", (t) => {
	const src = [ 'x', 1, 2, 3, 4, 5, 'x' ]
	const call = (srcStart, srcEnd, num) => {
		const dst = [ 'y', 'y', 'y', 'y', 'y', 'y' ]
		__unweave(dst, 2, src, srcStart, srcEnd, num)
		return dst
	}

	t.equal(call(1, 6, 2), [ 'y', 'y', [ 1, 3, 5 ], [ 2, 4 ], 'y', 'y' ])
	t.equal(call(1, 6, 2).slice(2, 4), unweave(src.slice(1, 6), 2))
	t.equal(call(2, 6, 3), [ 'y', 'y', [ 2, 5 ], [ 3 ], [ 4 ], 'y' ])
	t.equal(call(2, 4, 3), [ 'y', 'y', [ 2 ], [ 3 ], [], 'y' ])
	t.equal(call(3, 4, 1), [ 'y', 'y', [ 3 ], 'y', 'y', 'y' ])
	t.equal(call(3, 3, 2), [ 'y', 'y', [], [], 'y', 'y' ])
	t.equal(src, [ 'x', 1, 2, 3, 4, 5, 'x' ])
})
