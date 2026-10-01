const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __chunk, chunk } = require('./chunk')

testVariants("array.chunk", chunk, (t, f) => {
	t.equal(f([], 1), [])
	t.equal(f([ 1 ], 1), [ [ 1 ] ])
	t.equal(f([ 1, 2, 3 ], 1), [ [ 1 ], [ 2 ], [ 3 ] ])
	t.equal(f([ 1, 2, 3 ], 2), [ [ 1, 2 ], [ 3 ] ])
	t.equal(f([ 1, 2, 3 ], 3), [ [ 1, 2, 3 ] ])
	t.equal(f([ 1, 2, 3 ], 4), [ [ 1, 2, 3 ] ])
	t.equal(f([ 1, 2, 3, 4, 5 ], 2), [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ])
})

test("array.__chunk", (t) => {
	{
		const src = [ 'a', 1, 2, 3, 4, 5, 'b' ]
		const dst = [ 'x', 'x', 'x', 'x', 'x' ]
		__chunk(dst, 1, src, 1, 6, 2, 3)
		t.equal(dst, [ 'x', [ 1, 2 ], [ 3, 4 ], [ 5 ], 'x' ])
		t.equal(dst.slice(1, 4), chunk(src.slice(1, 6), 2))
		t.equal(src, [ 'a', 1, 2, 3, 4, 5, 'b' ])
	}

	{
		const src = [ 'a', 1, 2, 3, 4, 'b' ]
		const dst = [ 'x', 'x', 'x', 'x' ]
		__chunk(dst, 1, src, 1, 5, 2, 2)
		t.equal(dst, [ 'x', [ 1, 2 ], [ 3, 4 ], 'x' ])
	}

	{
		const src = [ 'a', 1, 2, 'b' ]
		const dst = [ 'x', 'x', 'x' ]
		__chunk(dst, 1, src, 1, 3, 5, 1)
		t.equal(dst, [ 'x', [ 1, 2 ], 'x' ])
	}

	{
		const src = [ 'a', 1, 'b' ]
		const dst = [ 'x', 'x', 'x' ]
		__chunk(dst, 1, src, 1, 2, 1, 1)
		t.equal(dst, [ 'x', [ 1 ], 'x' ])
	}
})

test("array.__chunk no chunks", (t) => {
	const src = [ 'a', 1, 2, 'b' ]
	const dst = [ 'x', 'x', 'x' ]
	__chunk(dst, 1, src, 1, 3, 2, 0)
	t.equal(dst, [ 'x', 'x', 'x' ])
	__chunk(dst, 1, src, 1, 1, 2, 0)
	t.equal(dst, [ 'x', 'x', 'x' ])
})
