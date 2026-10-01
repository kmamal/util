const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __aperture, aperture } = require('./aperture')

testVariants("array.aperture", aperture, (t, f) => {
	t.equal(f([], 1), [])
	t.equal(f([ 1 ], 1), [ [ 1 ] ])
	t.equal(f([ 1, 2, 3 ], 1), [ [ 1 ], [ 2 ], [ 3 ] ])
	t.equal(f([ 1, 2, 3 ], 2), [ [ 1, 2 ], [ 2, 3 ] ])
	t.equal(f([ 1, 2, 3 ], 3), [ [ 1, 2, 3 ] ])
	t.equal(f([ 1, 2, 3 ], 4), [ [ 1, 2, 3 ] ])
	t.equal(f([ 1, 2, 3, 4, 5 ], 2), [ [ 1, 2 ], [ 2, 3 ], [ 3, 4 ], [ 4, 5 ] ])
})

test("array.__aperture", (t) => {
	{
		const src = [ 'a', 1, 2, 3, 4, 'b' ]
		const dst = [ 'x', 'x', 'x', 'x', 'x' ]
		__aperture(dst, 1, src, 1, 5, 2)
		t.equal(dst, [ 'x', [ 1, 2 ], [ 2, 3 ], [ 3, 4 ], 'x' ])
		t.equal(dst.slice(1, 4), aperture(src.slice(1, 5), 2))
		t.equal(src, [ 'a', 1, 2, 3, 4, 'b' ])
	}

	{
		const src = [ 'a', 1, 2, 3, 'b' ]
		const dst = [ 'x', 'x', 'x' ]
		__aperture(dst, 1, src, 1, 4, 5)
		t.equal(dst, [ 'x', [ 1, 2, 3 ], 'x' ])
	}

	{
		const src = [ 'a', 1, 'b' ]
		const dst = [ 'x', 'x', 'x' ]
		__aperture(dst, 1, src, 1, 2, 2)
		t.equal(dst, [ 'x', [ 1 ], 'x' ])
	}

	{
		const src = [ 'a', 1, 'b' ]
		const dst = [ 'x', 'x' ]
		__aperture(dst, 1, src, 1, 1, 2)
		t.equal(dst, [ 'x', 'x' ])
	}
})
