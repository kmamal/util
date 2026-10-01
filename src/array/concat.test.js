const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __concat, concat, concatTo, concat$$$ } = require('./concat')

testVariants("array.concat", concat, (t, f) => {
	t.equal(f([]), [])
	t.equal(f([ [] ]), [])
	t.equal(f([ [], [], [] ]), [])
	t.equal(f([ [ 1, 2, 3 ] ]), [ 1, 2, 3 ])
	t.equal(f([ [ 1 ], [ 2 ], [ 3 ] ]), [ 1, 2, 3 ])
	t.equal(f([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
	t.equal(f([ [ [] ], [ {} ], [ null ], [ undefined ] ]), [ [], {}, null, undefined ])
}, { to: concatTo, $$$: concat$$$ })

test("array.concat exports", (t) => {
	const arrs = [ [ 1 ], [ 2 ] ]
	concat(arrs)
	t.equal(arrs, [ [ 1 ], [ 2 ] ])
	t.ok(concat.to === concatTo)
	t.ok(concat.$$$ === concat$$$)
})

test("array.__concat", (t) => {
	{
		const src = [ [ 'a' ], [ 1, 2 ], [], [ 3 ], [ 4, 5, 6 ], [ 'b' ] ]
		const dst = [ 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x' ]
		const n = __concat(dst, 1, src, 1, 5)
		t.equal(n, 6)
		t.equal(dst, [ 'x', 1, 2, 3, 4, 5, 6, 'x' ])
		t.equal(dst.slice(1, 1 + n), concat(src.slice(1, 5)))
		t.equal(src, [ [ 'a' ], [ 1, 2 ], [], [ 3 ], [ 4, 5, 6 ], [ 'b' ] ])
	}

	{
		const dst = [ 'x', 'x', 'x', 'x' ]
		t.equal(__concat(dst, 1, [ [ 'a' ], [ 1, 2 ], [ 'b' ] ], 1, 2), 2)
		t.equal(dst, [ 'x', 1, 2, 'x' ])
	}

	{
		const dst = [ 'x', 'x' ]
		t.equal(__concat(dst, 1, [ [ 'a' ], [], [ 'b' ] ], 1, 2), 0)
		t.equal(dst, [ 'x', 'x' ])
	}

	{
		const dst = [ 'x', 'x' ]
		t.equal(__concat(dst, 1, [ [ 'a' ], [ 'b' ] ], 1, 1), 0)
		t.equal(dst, [ 'x', 'x' ])
	}
})
