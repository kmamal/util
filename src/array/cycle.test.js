const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __cycle, cycle } = require('./cycle')

testVariants("array.cycle", cycle, (t, f) => {
	t.equal(f([], 0), [])
	t.equal(f([], 3), [])
	t.equal(f([], 10), [])
	t.equal(f([ 1, 2, 3 ], 0), [])
	t.equal(f([ 1, 2, 3 ], 1), [ 1 ])
	t.equal(f([ 1, 2, 3 ], 2), [ 1, 2 ])
	t.equal(f([ 1, 2, 3 ], 3), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 3 ], 4), [ 1, 2, 3, 1 ])
	t.equal(f([ 1, 2, 3 ], 7), [ 1, 2, 3, 1, 2, 3, 1 ])
})

test("array.__cycle", (t) => {
	{
		const src = [ 'a', 1, 2, 3, 'b' ]
		const dst = [ 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x' ]
		t.equal(__cycle(dst, 2, src, 1, 4, 7), 7)
		t.equal(dst, [ 'x', 'x', 1, 2, 3, 1, 2, 3, 1, 'x' ])
		t.equal(dst.slice(2, 9), cycle(src.slice(1, 4), 7))
		t.equal(src, [ 'a', 1, 2, 3, 'b' ])
	}

	{
		const dst = [ 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x' ]
		t.equal(__cycle(dst, 1, [ 'a', 1, 2, 3, 'b' ], 1, 4, 6), 6)
		t.equal(dst, [ 'x', 1, 2, 3, 1, 2, 3, 'x' ])
	}

	{
		const dst = [ 'x', 'x', 'x' ]
		t.equal(__cycle(dst, 1, [ 'a', 1, 2, 3, 'b' ], 1, 4, 1), 1)
		t.equal(dst, [ 'x', 1, 'x' ])
	}

	{
		const dst = [ 'x', 'x', 'x', 'x', 'x' ]
		t.equal(__cycle(dst, 1, [ 'a', 1, 'b' ], 1, 2, 3), 3)
		t.equal(dst, [ 'x', 1, 1, 1, 'x' ])
	}

	{
		const dst = [ 'x', 'x' ]
		t.equal(__cycle(dst, 1, [ 'a', 1, 'b' ], 1, 2, 0), 0)
		t.equal(dst, [ 'x', 'x' ])
	}

	{
		const dst = [ 'x', 'x' ]
		t.equal(__cycle(dst, 1, [ 'a', 'b' ], 1, 1, 5), 0)
		t.equal(dst, [ 'x', 'x' ])
	}
})
