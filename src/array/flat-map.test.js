const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __flatMap, flatMap } = require('./flat-map')

testVariants("array.flatMap", flatMap, (t, f) => {
	t.equal(f([], () => {}), [])
	t.equal(f([], () => [ 1, 2, 3 ]), [])
	t.equal(f([ 1 ], (x) => [ x ]), [ 1 ])
	t.equal(f([ 1, 2, 3 ], () => []), [])
	t.equal(f([ 1, 2, 3 ], (x) => [ x ]), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 3 ], (x) => [ x * 2 ]), [ 2, 4, 6 ])
	t.equal(f([ 1, 2, 3 ], (x) => [ x, x * 2 ]), [ 1, 2, 2, 4, 3, 6 ])
})

test("array.__flatMap", (t) => {
	const fn = (x) => new Array(x).fill(x)

	{
		const src = [ 9, 1, 0, 2, 3, 9 ]
		const dst = [ 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x' ]
		const n = __flatMap(dst, 2, src, 1, 5, fn)
		t.equal(n, 6)
		t.equal(dst, [ 'x', 'x', 1, 2, 2, 3, 3, 3, 'x' ])
		t.equal(dst.slice(2, 2 + n), flatMap(src.slice(1, 5), fn))
		t.equal(src, [ 9, 1, 0, 2, 3, 9 ])
	}

	{
		const dst = [ 'x', 'x', 'x', 'x' ]
		t.equal(__flatMap(dst, 1, [ 9, 2, 9 ], 1, 2, fn), 2)
		t.equal(dst, [ 'x', 2, 2, 'x' ])
	}

	{
		const dst = [ 'x', 'x' ]
		t.equal(__flatMap(dst, 1, [ 9, 0, 9 ], 1, 2, fn), 0)
		t.equal(dst, [ 'x', 'x' ])
	}

	{
		const dst = [ 'x', 'x' ]
		t.equal(__flatMap(dst, 1, [ 9, 9 ], 1, 1, fn), 0)
		t.equal(dst, [ 'x', 'x' ])
	}
})
