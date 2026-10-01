const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __combine, combine } = require('./combine')
const { add } = require('../operators')

testVariants("array.combine", combine, (t, f) => {
	t.equal(f([], [], add), [])
	t.equal(f([ 1 ], [ 1 ], add), [ 2 ])
	t.equal(f([ 1, 2, 3 ], [ 1, 2, 3 ], add), [ 2, 4, 6 ])
})

test("array.__combine", (t) => {
	{
		const a = [ 'a', 'a', 1, 2, 3, 'a' ]
		const b = [ 'b', 10, 20, 30, 'b', 'b' ]
		const dst = [ 'x', 'x', 'x', 'x', 'x' ]
		__combine(dst, 1, a, 2, b, 1, 3, add)
		t.equal(dst, [ 'x', 11, 22, 33, 'x' ])
		t.equal(dst.slice(1, 4), combine(a.slice(2, 5), b.slice(1, 4), add))
		t.equal(a, [ 'a', 'a', 1, 2, 3, 'a' ])
		t.equal(b, [ 'b', 10, 20, 30, 'b', 'b' ])
	}

	{
		const dst = [ 'x', 'x', 'x' ]
		__combine(dst, 1, [ 'a', 1, 'a' ], 1, [ 'b', 2, 'b' ], 1, 1, add)
		t.equal(dst, [ 'x', 3, 'x' ])
	}

	{
		const dst = [ 'x', 'x' ]
		__combine(dst, 1, [ 'a', 1 ], 1, [ 'b', 2 ], 1, 0, add)
		t.equal(dst, [ 'x', 'x' ])
	}
})
