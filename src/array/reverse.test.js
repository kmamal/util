const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __reverse, reverse } = require('./reverse')

testVariants("array.reverse", reverse, (t, f) => {
	t.equal(f([]), [])
	t.equal(f([ 1 ]), [ 1 ])
	t.equal(f([ 1, 1 ]), [ 1, 1 ])
	t.equal(f([ 1, 2 ]), [ 2, 1 ])
	t.equal(f([ 1, 2, 3 ]), [ 3, 2, 1 ])
	t.equal(f([ 1, 2, 3, 4 ]), [ 4, 3, 2, 1 ])
})

test("array.__reverse", (t) => {
	const src = [ 'x', 1, 2, 3, 4, 'x' ]
	const call = (srcStart, srcEnd) => {
		const dst = [ 'y', 'y', 'y', 'y', 'y', 'y', 'y' ]
		__reverse(dst, 2, src, srcStart, srcEnd)
		return dst
	}

	t.equal(call(1, 5), [ 'y', 'y', 4, 3, 2, 1, 'y' ])
	t.equal(call(1, 4), [ 'y', 'y', 3, 2, 1, 'y', 'y' ])
	t.equal(call(1, 4).slice(2, 5), reverse(src.slice(1, 4)))
	t.equal(call(2, 3), [ 'y', 'y', 2, 'y', 'y', 'y', 'y' ])
	t.equal(call(2, 2), [ 'y', 'y', 'y', 'y', 'y', 'y', 'y' ])
	t.equal(src, [ 'x', 1, 2, 3, 4, 'x' ])

	const even = [ 'x', 1, 2, 3, 4, 'x' ]
	__reverse(even, 1, even, 1, 5)
	t.equal(even, [ 'x', 4, 3, 2, 1, 'x' ])

	const odd = [ 'x', 1, 2, 3, 'x', 'x' ]
	__reverse(odd, 1, odd, 1, 4)
	t.equal(odd, [ 'x', 3, 2, 1, 'x', 'x' ])

	const one = [ 'x', 1, 'x' ]
	__reverse(one, 1, one, 1, 2)
	t.equal(one, [ 'x', 1, 'x' ])
})
