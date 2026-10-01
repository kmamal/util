const { test } = require('@kmamal/testing')
const { testVariants } = require('../../testing/test-variants')
const {
	__countingsortInitCounts,
	__countingsortCount,
	__countingsortAssign,
	__countingsortDistribute,
	countingsort,
	countingsortBy,
} = require('./countingsort')
const { identity } = require('../../function/identity')

testVariants("array.sorting.countingsort", countingsort, (t, f) => {
	t.equal(f([]), [])
	t.equal(f([ 3, 1, 2, 1, 0 ]), [ 0, 1, 1, 2, 3 ])
	t.equal(f([ 3, 1, 2 ]), [ 1, 2, 3 ])
})

testVariants("array.sorting.countingsortBy", countingsortBy, (t, f) => {
	const arr = [ { v: 2 }, { v: 0 }, { v: 1 }, { v: 0 } ]
	const expected = [ arr[1], arr[3], arr[2], arr[0] ]
	t.equal(f(Array.from(arr), (x) => x.v), expected)
	t.equal(f([ 3, 1, 2 ], (x) => x * 2), [ 1, 2, 3 ])
	t.equal(f([ 3, 1, 2 ], (x) => 3 - x), [ 3, 2, 1 ])
})

test("array.sorting.__countingsortInitCounts", (t) => {
	t.equal(__countingsortInitCounts(0), [ 0 ])
	t.equal(__countingsortInitCounts(3), [ 0, 0, 0, 0 ])
})

test("array.sorting.__countingsortCount", (t) => {
	const arr = [ 3, 3, 0, 2, 0, 1, 3, 3 ]
	const counts = __countingsortInitCounts(3)
	__countingsortCount(arr, 2, 6, counts, identity)
	t.equal(counts, [ 2, 1, 1, 0 ])
	t.equal(arr, [ 3, 3, 0, 2, 0, 1, 3, 3 ])

	__countingsortCount(arr, 5, 7, counts, identity)
	t.equal(counts, [ 2, 2, 1, 1 ])

	__countingsortCount(arr, 4, 4, counts, identity)
	t.equal(counts, [ 2, 2, 1, 1 ])

	const objs = [ { v: 9 }, { v: 1 }, { v: 1 }, { v: 9 } ]
	const counts2 = __countingsortInitCounts(1)
	__countingsortCount(objs, 1, 3, counts2, (x) => x.v)
	t.equal(counts2, [ 0, 2 ])
})

test("array.sorting.__countingsortAssign", (t) => {
	const dst = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]
	__countingsortAssign(dst, 2, [ 2, 0, 1, 1 ])
	t.equal(dst, [ 'a', 'b', 0, 0, 2, 3, 'g' ])

	const dst2 = [ 'a', 'b' ]
	__countingsortAssign(dst2, 1, [ 0, 0 ])
	t.equal(dst2, [ 'a', 'b' ])

	const dst3 = [ 'a', 'b', 'c' ]
	__countingsortAssign(dst3, 1, [ 0, 1 ])
	t.equal(dst3, [ 'a', 1, 'c' ])
})

test("array.sorting.__countingsortDistribute", (t) => {
	const src = [ 'x', { v: 2 }, { v: 0 }, { v: 1 }, { v: 0 }, { v: 2 }, 'y' ]
	const srcCopy = Array.from(src)
	const fnMap = (x) => x.v
	const counts = __countingsortInitCounts(2)
	__countingsortCount(src, 1, 6, counts, fnMap)
	const dst = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]
	__countingsortDistribute(dst, 2, src, 1, 6, counts, fnMap)
	t.equal(src, srcCopy)
	t.equal(dst.slice(0, 2), [ 'a', 'b' ])
	t.equal(dst.slice(7), [ 'h' ])
	t.ok(dst[2] === src[2])
	t.ok(dst[3] === src[4])
	t.ok(dst[4] === src[3])
	t.ok(dst[5] === src[1])
	t.ok(dst[6] === src[5])

	const dst2 = [ 'a', 'b' ]
	__countingsortDistribute(dst2, 1, src, 3, 3, __countingsortInitCounts(2), fnMap)
	t.equal(dst2, [ 'a', 'b' ])

	const dst3 = [ 'a', 'b', 'c' ]
	const counts3 = __countingsortInitCounts(2)
	__countingsortCount(src, 3, 4, counts3, fnMap)
	__countingsortDistribute(dst3, 1, src, 3, 4, counts3, fnMap)
	t.equal(dst3[0], 'a')
	t.ok(dst3[1] === src[3])
	t.equal(dst3[2], 'c')
})
