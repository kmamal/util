const { test } = require('@kmamal/testing')
const { testVariants } = require('../../testing/test-variants')
const { __pigeonholesort, pigeonholesort, pigeonholesortBy } = require('./pigeonholesort')
const { identity } = require('../../function/identity')

const createBuckets = (maxValue) => Array.from({ length: maxValue + 1 }, () => [])

testVariants("array.sorting.pigeonholesort", pigeonholesort, (t, f) => {
	t.equal(f([]), [])
	t.equal(f([ 3, 1, 2, 1, 0 ]), [ 0, 1, 1, 2, 3 ])
	t.equal(f([ 3, 1, 2 ]), [ 1, 2, 3 ])
})

testVariants("array.sorting.pigeonholesortBy", pigeonholesortBy, (t, f) => {
	const arr = [ { v: 2 }, { v: 0 }, { v: 1 }, { v: 0 } ]
	const expected = [ arr[1], arr[3], arr[2], arr[0] ]
	t.equal(f(Array.from(arr), (x) => x.v), expected)
	t.equal(f([ 3, 1, 2 ], (x) => x * 2), [ 1, 2, 3 ])
	t.equal(f([ 3, 1, 2 ], (x) => 3 - x), [ 3, 2, 1 ])
})

test("array.sorting.__pigeonholesort", (t) => {
	const src = [ 'x', { v: 2 }, { v: 0 }, { v: 1 }, { v: 0 }, { v: 2 }, 'y' ]
	const srcCopy = Array.from(src)
	const dst = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]
	__pigeonholesort(dst, 2, src, 1, 6, createBuckets(2), (x) => x.v)
	t.equal(src, srcCopy)
	t.equal(dst.slice(0, 2), [ 'a', 'b' ])
	t.equal(dst.slice(7), [ 'h' ])
	t.ok(dst[2] === src[2])
	t.ok(dst[3] === src[4])
	t.ok(dst[4] === src[3])
	t.ok(dst[5] === src[1])
	t.ok(dst[6] === src[5])

	const dst2 = [ 'a', 'b', 'c', 'd', 'e', 'f' ]
	__pigeonholesort(dst2, 1, [ 9, 3, 1, 2, 1, 9 ], 1, 5, createBuckets(3), identity)
	t.equal(dst2, [ 'a', 1, 1, 2, 3, 'f' ])

	const dst3 = [ 'a', 'b' ]
	__pigeonholesort(dst3, 1, [ 1, 2 ], 1, 1, createBuckets(2), identity)
	t.equal(dst3, [ 'a', 'b' ])

	const dst4 = [ 'a', 'b', 'c' ]
	__pigeonholesort(dst4, 1, [ 9, 2, 9 ], 1, 2, createBuckets(2), identity)
	t.equal(dst4, [ 'a', 2, 'c' ])
})
