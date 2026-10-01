const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __merge, __mergeGalloping, __mergeRight, __mergeInplace, merge, mergeBy, mergeWith } = require('./merge')
const { compareBy } = require('../function/compare')

testVariants("array.merge", merge, (t, f) => {
	t.equal(f([], []), [])
	t.equal(f([ 1, 2, 3 ], []), [ 1, 2, 3 ])
	t.equal(f([], [ 1, 2, 3 ]), [ 1, 2, 3 ])
	t.equal(f([ 1 ], [ 2 ]), [ 1, 2 ])
	t.equal(f([ 2 ], [ 1 ]), [ 1, 2 ])
	t.equal(f([ 1, 3 ], [ 2 ]), [ 1, 2, 3 ])
	t.equal(f([ 1, 3, 5 ], [ 2, 4, 6 ]), [ 1, 2, 3, 4, 5, 6 ])
	t.equal(f([ 2, 4, 6 ], [ 1, 3, 5 ]), [ 1, 2, 3, 4, 5, 6 ])
}, { $$$: null })

testVariants("array.mergeBy", mergeBy, (t, f) => {
	t.equal(f([], [], (x) => 2 * x), [])
	t.equal(f([ 1, 2, 3 ], [], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(f([], [ 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(f([ 1 ], [ 2 ], (x) => 2 * x), [ 1, 2 ])
	t.equal(f([ 2 ], [ 1 ], (x) => 2 * x), [ 1, 2 ])
	t.equal(f([ 1, 3, 5 ], [ 2, 4, 6 ], (x) => 2 * x), [ 1, 2, 3, 4, 5, 6 ])
	t.equal(f([ 2, 4, 6 ], [ 1, 3, 5 ], (x) => 2 * x), [ 1, 2, 3, 4, 5, 6 ])
	t.equal(f([ 1, 15, 23 ], [ 2, 12, 31 ], (x) => Math.floor(x / 10)), [ 1, 2, 15, 12, 23, 31 ])
}, { $$$: null })

testVariants("array.mergeWith", mergeWith, (t, f) => {
	t.equal(f([], [], (a, b) => b - a), [])
	t.equal(f([ 3, 2, 1 ], [], (a, b) => b - a), [ 3, 2, 1 ])
	t.equal(f([], [ 3, 2, 1 ], (a, b) => b - a), [ 3, 2, 1 ])
	t.equal(f([ 1 ], [ 2 ], (a, b) => a - b), [ 1, 2 ])
	t.equal(f([ 1 ], [ 2 ], (a, b) => b - a), [ 2, 1 ])
	t.equal(f([ 5, 3, 1 ], [ 6, 4, 2 ], (a, b) => b - a), [ 6, 5, 4, 3, 2, 1 ])
	t.equal(f([ 1, 15, 23 ], [ 2, 12, 31 ], compareBy((x) => Math.floor(x / 10))), [ 1, 2, 15, 12, 23, 31 ])
}, { $$$: null })

test("array.__mergeGalloping", (t) => {
	const fnCmp = compareBy((x) => x.key)
	const a = Array.from({ length: 20 }, (_, i) => ({ key: 5, id: `a${i}` }))
	const b = Array.from({ length: 20 }, (_, i) => ({ key: i < 10 ? 0 : 5, id: `b${i}` }))
	const expected = []
	__merge(expected, 0, a, 0, a.length, b, 0, b.length, fnCmp)
	const actual = []
	__mergeGalloping(actual, 0, a, 0, a.length, b, 0, b.length, fnCmp)
	t.equal(actual, expected)

	const empty = []
	__mergeGalloping(empty, 0, [], 0, 0, a, 0, a.length, fnCmp)
	t.equal(empty, a)
})

test("array.__mergeRight", (t) => {
	const fnCmp = compareBy((x) => x.key)
	const item = (key, id) => ({ key, id })
	const ids = (arr) => arr.map((x) => typeof x === 'object' ? x.id : x)

	const a = [ item(9, 'pa'), item(1, 'a0'), item(2, 'a1'), item(2, 'a2'), item(0, 'pa') ]
	const b = [ item(9, 'pb'), item(9, 'pb'), item(0, 'b0'), item(2, 'b1'), item(3, 'b2'), item(0, 'pb') ]
	const aIds = ids(a)
	const bIds = ids(b)
	const dst = [ 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'y' ]
	__mergeRight(dst, 2, a, 1, 4, b, 2, 5, fnCmp)
	t.equal(ids(dst), [ 'y', 'y', 'b0', 'a0', 'a1', 'a2', 'b1', 'b2', 'y' ])
	t.equal(ids(a), aIds)
	t.equal(ids(b), bIds)

	const expected = []
	__merge(expected, 0, a, 1, 4, b, 2, 5, fnCmp)
	t.equal(ids(dst.slice(2, 8)), ids(expected))

	const equal = [ 'y', 'y', 'y', 'y', 'y', 'y' ]
	const ea = [ item(5, 'pa'), item(1, 'a0'), item(1, 'a1') ]
	const eb = [ item(1, 'b0'), item(1, 'b1'), item(5, 'pb') ]
	__mergeRight(equal, 1, ea, 1, 3, eb, 0, 2, fnCmp)
	t.equal(ids(equal), [ 'y', 'a0', 'a1', 'b0', 'b1', 'y' ])

	const onlyA = [ 'y', 'y', 'y', 'y' ]
	__mergeRight(onlyA, 1, a, 1, 3, b, 3, 3, fnCmp)
	t.equal(ids(onlyA), [ 'y', 'a0', 'a1', 'y' ])

	const onlyB = [ 'y', 'y', 'y', 'y' ]
	__mergeRight(onlyB, 1, a, 2, 2, b, 2, 4, fnCmp)
	t.equal(ids(onlyB), [ 'y', 'b0', 'b1', 'y' ])

	const none = [ 'y', 'y' ]
	__mergeRight(none, 1, a, 2, 2, b, 3, 3, fnCmp)
	t.equal(none, [ 'y', 'y' ])
})

test("array.__mergeInplace", (t) => {
	const fnCmp = compareBy((x) => x.key)
	const item = (key, id) => ({ key, id })
	const ids = (arr) => arr.map((x) => x.id)

	const shortLeft = [
		item(9, 'p0'),
		item(1, 'a0'),
		item(3, 'a1'),
		item(0, 'b0'),
		item(1, 'b1'),
		item(3, 'b2'),
		item(4, 'b3'),
		item(0, 'p1'),
	]
	__mergeInplace(shortLeft, 1, 3, 7, [], fnCmp)
	t.equal(ids(shortLeft), [ 'p0', 'b0', 'a0', 'b1', 'a1', 'b2', 'b3', 'p1' ])

	const shortRight = [
		item(9, 'p0'),
		item(0, 'a0'),
		item(1, 'a1'),
		item(3, 'a2'),
		item(4, 'a3'),
		item(1, 'b0'),
		item(3, 'b1'),
		item(0, 'p1'),
	]
	__mergeInplace(shortRight, 1, 5, 7, [], fnCmp)
	t.equal(ids(shortRight), [ 'p0', 'a0', 'a1', 'b0', 'a2', 'b1', 'a3', 'p1' ])

	const equalLengths = [ item(9, 'p0'), item(2, 'a0'), item(2, 'a1'), item(2, 'b0'), item(2, 'b1'), item(0, 'p1') ]
	__mergeInplace(equalLengths, 1, 3, 5, [], fnCmp)
	t.equal(ids(equalLengths), [ 'p0', 'a0', 'a1', 'b0', 'b1', 'p1' ])

	const reversedRuns = [ item(9, 'p0'), item(5, 'a0'), item(6, 'a1'), item(1, 'b0'), item(2, 'b1'), item(0, 'p1') ]
	__mergeInplace(reversedRuns, 1, 3, 5, [], fnCmp)
	t.equal(ids(reversedRuns), [ 'p0', 'b0', 'b1', 'a0', 'a1', 'p1' ])

	const emptyA = [ item(9, 'p0'), item(1, 'b0'), item(2, 'b1'), item(0, 'p1') ]
	__mergeInplace(emptyA, 1, 1, 3, [], fnCmp)
	t.equal(ids(emptyA), [ 'p0', 'b0', 'b1', 'p1' ])

	const emptyB = [ item(9, 'p0'), item(1, 'a0'), item(2, 'a1'), item(0, 'p1') ]
	__mergeInplace(emptyB, 1, 3, 3, [], fnCmp)
	t.equal(ids(emptyB), [ 'p0', 'a0', 'a1', 'p1' ])

	const buffer = [ 'z', 'z', 'z', 'z' ]
	const withBuffer = [ item(9, 'p0'), item(2, 'a0'), item(1, 'b0'), item(0, 'p1') ]
	__mergeInplace(withBuffer, 1, 2, 3, buffer, fnCmp)
	t.equal(ids(withBuffer), [ 'p0', 'b0', 'a0', 'p1' ])
})
