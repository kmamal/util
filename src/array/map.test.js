const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __map, __mapIndexed, map, mapIndexed } = require('./map')

testVariants("array.map", map, (t, f) => {
	t.equal(f([], (x) => 2 * x), [])
	t.equal(f([ 1, 2, 3 ], (x) => 2 * x), [ 2, 4, 6 ])
	t.equal(f([ 1, 2, 3 ], (x) => x), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 3 ], () => 5), [ 5, 5, 5 ])
})

testVariants("array.mapIndexed", mapIndexed, (t, f) => {
	t.equal(f([], (x, i) => x * i), [])
	t.equal(f([ 1, 2, 3 ], (x, i) => x * i), [ 0, 2, 6 ])
	t.equal(f([ 1, 2, 3 ], (x, i) => i), [ 0, 1, 2 ])
	t.equal(f([ 1, 2, 3 ], (x) => x), [ 1, 2, 3 ])
})

test("array.__map", (t) => {
	const double = (x) => 2 * x
	const src = [ 'x', 1, 2, 3, 'x' ]
	const dst = [ 'y', 'y', 'y', 'y', 'y', 'y' ]
	__map(dst, 2, src, 1, 4, double)
	t.equal(dst, [ 'y', 'y', 2, 4, 6, 'y' ])
	t.equal(src, [ 'x', 1, 2, 3, 'x' ])
	t.equal(dst.slice(2, 5), map(src.slice(1, 4), double))

	const single = [ 'y', 'y', 'y' ]
	__map(single, 1, src, 2, 3, double)
	t.equal(single, [ 'y', 4, 'y' ])

	const empty = [ 'y', 'y' ]
	__map(empty, 1, src, 2, 2, double)
	t.equal(empty, [ 'y', 'y' ])
})

test("array.__mapIndexed", (t) => {
	const pair = (x, i) => [ x, i ]
	const src = [ 'x', 'a', 'b', 'c', 'x' ]
	const dst = [ 'y', 'y', 'y', 'y', 'y', 'y' ]
	__mapIndexed(dst, 2, src, 1, 4, pair)
	t.equal(dst, [ 'y', 'y', [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ], 'y' ])
	t.equal(src, [ 'x', 'a', 'b', 'c', 'x' ])

	const single = [ 'y', 'y', 'y' ]
	__mapIndexed(single, 1, src, 3, 4, pair)
	t.equal(single, [ 'y', [ 'c', 3 ], 'y' ])

	const empty = [ 'y', 'y' ]
	__mapIndexed(empty, 1, src, 2, 2, pair)
	t.equal(empty, [ 'y', 'y' ])
})
