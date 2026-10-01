const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __flat, flat } = require('./flat')

testVariants("array.flat", flat, (t, f) => {
	t.equal(f([]), [])
	t.equal(f([ [] ]), [])
	t.equal(f([ [], [], [] ]), [])
	t.equal(f([ [ 1, 2, 3 ] ]), [ 1, 2, 3 ])
	t.equal(f([ [ 1 ], [ 2 ], [ 3 ] ]), [ 1, 2, 3 ])
	t.equal(f([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
	t.equal(f([ [ [ 1 ], 2, [ 3 ] ], [ 4, [ 5, 6 ] ], [ [ 7, 8 ], 9 ] ]), [ [ 1 ], 2, [ 3 ], 4, [ 5, 6 ], [ 7, 8 ], 9 ])
	t.equal(f([ 1, 2, [ 3, 4, [ 5, 6 ] ] ]), [ 1, 2, 3, 4, [ 5, 6 ] ])
	t.equal(f([ 1, 2, [ 3, 4, [ 5, 6, [ 7, 8, [ 9 ] ] ] ] ], Infinity), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
})

test("array.__flat", (t) => {
	{
		const src = [ [ 'a' ], 1, [ 2, [ 3, [ 4 ] ] ], [], [ 5 ], [ 'b' ] ]
		const dst = [ 'x', 'x', 'x', 'x', 'x', 'x', 'x' ]
		const n = __flat(dst, 2, src, 1, 5, 1)
		t.equal(n, 4)
		t.equal(dst, [ 'x', 'x', 1, 2, [ 3, [ 4 ] ], 5, 'x' ])
		t.equal(dst.slice(2, 2 + n), flat(src.slice(1, 5)))
		t.equal(src, [ [ 'a' ], 1, [ 2, [ 3, [ 4 ] ] ], [], [ 5 ], [ 'b' ] ])
	}

	{
		const src = [ [ 'a' ], 1, [ 2, [ 3, [ 4 ] ] ], [ 'b' ] ]
		const dst = [ 'x', 'x', 'x', 'x', 'x', 'x' ]
		const n = __flat(dst, 1, src, 1, 3, Infinity)
		t.equal(n, 4)
		t.equal(dst, [ 'x', 1, 2, 3, 4, 'x' ])
	}

	{
		const src = [ [ 'a' ], [ 1, [ 2 ] ], [ 'b' ] ]
		const dst = [ 'x', 'x', 'x' ]
		t.equal(__flat(dst, 1, src, 1, 2, 0), 1)
		t.equal(dst, [ 'x', [ 1, [ 2 ] ], 'x' ])
	}

	{
		const dst = [ 'x', 'x' ]
		t.equal(__flat(dst, 1, [ [ 'a' ], [], [ 'b' ] ], 1, 2, 1), 0)
		t.equal(dst, [ 'x', 'x' ])
	}

	{
		const dst = [ 'x', 'x' ]
		t.equal(__flat(dst, 1, [ [ 'a' ], [ 'b' ] ], 1, 1, 1), 0)
		t.equal(dst, [ 'x', 'x' ])
	}
})
