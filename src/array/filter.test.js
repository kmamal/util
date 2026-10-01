const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __filter, filter } = require('./filter')

testVariants("array.filter", filter, (t, f) => {
	t.equal(f([], () => {}), [])
	t.equal(f([ 1, 2, 3 ], (x) => x % 2), [ 1, 3 ])
	t.equal(f([ 1, 2, 3 ], () => false), [])
	t.equal(f([ 1, 2, 3 ], () => true), [ 1, 2, 3 ])
})

test("array.__filter", (t) => {
	const fn = (x) => x % 2

	{
		const src = [ 1, 2, 3, 4, 5, 6, 7 ]
		const dst = [ 'x', 'x', 'x', 'x', 'x' ]
		const n = __filter(dst, 2, src, 1, 6, fn)
		t.equal(n, 2)
		t.equal(dst, [ 'x', 'x', 3, 5, 'x' ])
		t.equal(dst.slice(2, 2 + n), filter(src.slice(1, 6), fn))
		t.equal(src, [ 1, 2, 3, 4, 5, 6, 7 ])
	}

	{
		const dst = [ 'x', 'x', 'x' ]
		t.equal(__filter(dst, 1, [ 1, 3, 2 ], 1, 2, fn), 1)
		t.equal(dst, [ 'x', 3, 'x' ])
	}

	{
		const dst = [ 'x', 'x', 'x' ]
		t.equal(__filter(dst, 1, [ 1, 2, 3 ], 1, 2, fn), 0)
		t.equal(dst, [ 'x', 'x', 'x' ])
	}

	{
		const dst = [ 'x', 'x' ]
		t.equal(__filter(dst, 1, [ 1, 3 ], 1, 1, fn), 0)
		t.equal(dst, [ 'x', 'x' ])
	}
})
