const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __scan, __scanRight, scan, scanRight } = require('./scan')

testVariants("array.scan", scan, (t, f) => {
	t.equal(f([], () => {}), [])
	t.equal(f([], () => {}, 'x'), [])
	t.equal(f([ 'a' ], () => {}), [ 'a' ])
	t.equal(f([ 'a' ], (a, x) => x), [ 'a' ])
	t.equal(f([ 'a', 'b', 'c' ], (a, x) => x), [ 'a', 'b', 'c' ])
	t.equal(f([ 'a', 'b', 'c' ], (a, x) => a + x), [ 'a', 'ab', 'abc' ])
	t.equal(f([ 'a', 'b', 'c' ], (a, x) => a + x, 'x'), [ 'xa', 'xab', 'xabc' ])
})

testVariants("array.scanRight", scanRight, (t, f) => {
	t.equal(f([], () => {}), [])
	t.equal(f([], () => {}, 'x'), [])
	t.equal(f([ 'a' ], () => {}), [ 'a' ])
	t.equal(f([ 'a' ], (a, x) => x), [ 'a' ])
	t.equal(f([ 'a', 'b', 'c' ], (a, x) => x), [ 'a', 'b', 'c' ])
	t.equal(f([ 'a', 'b', 'c' ], (a, x) => a + x), [ 'cba', 'cb', 'c' ])
	t.equal(f([ 'a', 'b', 'c' ], (a, x) => a + x, 'x'), [ 'xcba', 'xcb', 'xc' ])
})

test("array.__scan", (t) => {
	const concat = (a, x) => a + x
	const src = [ 'x', 'a', 'b', 'c', 'x' ]
	const call = (srcStart, srcEnd, init) => {
		const dst = [ 'y', 'y', 'y', 'y', 'y', 'y' ]
		__scan(dst, 2, src, srcStart, srcEnd, concat, init)
		return dst
	}

	t.equal(call(1, 4), [ 'y', 'y', 'a', 'ab', 'abc', 'y' ])
	t.equal(call(1, 4).slice(2, 5), scan(src.slice(1, 4), concat))
	t.equal(call(1, 4, 'i'), [ 'y', 'y', 'ia', 'iab', 'iabc', 'y' ])
	t.equal(call(1, 4, 'i').slice(2, 5), scan(src.slice(1, 4), concat, 'i'))
	t.equal(call(2, 3), [ 'y', 'y', 'b', 'y', 'y', 'y' ])
	t.equal(call(2, 3, 'i'), [ 'y', 'y', 'ib', 'y', 'y', 'y' ])
	t.equal(call(2, 2), [ 'y', 'y', 'y', 'y', 'y', 'y' ])
	t.equal(call(2, 2, 'i'), [ 'y', 'y', 'y', 'y', 'y', 'y' ])
	t.equal(src, [ 'x', 'a', 'b', 'c', 'x' ])
})

test("array.__scanRight", (t) => {
	const concat = (a, x) => a + x
	const src = [ 'x', 'a', 'b', 'c', 'x' ]
	const call = (srcStart, srcEnd, init) => {
		const dst = [ 'y', 'y', 'y', 'y', 'y', 'y' ]
		__scanRight(dst, 2, src, srcStart, srcEnd, concat, init)
		return dst
	}

	t.equal(call(1, 4), [ 'y', 'y', 'cba', 'cb', 'c', 'y' ])
	t.equal(call(1, 4).slice(2, 5), scanRight(src.slice(1, 4), concat))
	t.equal(call(1, 4, 'i'), [ 'y', 'y', 'icba', 'icb', 'ic', 'y' ])
	t.equal(call(1, 4, 'i').slice(2, 5), scanRight(src.slice(1, 4), concat, 'i'))
	t.equal(call(2, 3), [ 'y', 'y', 'b', 'y', 'y', 'y' ])
	t.equal(call(2, 3, 'i'), [ 'y', 'y', 'ib', 'y', 'y', 'y' ])
	t.equal(call(2, 2), [ 'y', 'y', 'y', 'y', 'y', 'y' ])
	t.equal(call(2, 2, 'i'), [ 'y', 'y', 'y', 'y', 'y', 'y' ])
	t.equal(src, [ 'x', 'a', 'b', 'c', 'x' ])
})
