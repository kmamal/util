const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __minN, minN, minNBy, minNWith, minNIndex, minNIndexBy, minNIndexWith } = require('./min-n')
const { sort } = require('./sort')
const { compare } = require('../function/compare')

testVariants("array.minN", minN, (t, f) => {
	t.equal(f([], 3), [])
	t.equal(f([ 1 ], 3), [ 1 ])
	t.equal(f([ 3, 1, 2 ], 0), [])
	t.equal(sort.$$$(f([ 2, 1, 3 ], 3)), [ 1, 2, 3 ])
	t.equal(sort.$$$(f([ 2, 1, 4, 3, 5 ], 3)), [ 1, 2, 3 ])
	t.equal(sort.$$$(f([ 1, 5, 2, 4, 3 ], 2)), [ 1, 2 ])
})

testVariants("array.minNBy", minNBy, (t, f) => {
	t.equal(f([], 3, (x) => -x), [])
	t.equal(f([ 1 ], 3, (x) => -x), [ 1 ])
	t.equal(f([ 3, 1, 2 ], 0, (x) => -x), [])
	t.equal(sort.$$$(f([ 2, 1, 3 ], 3, (x) => -x)), [ 1, 2, 3 ])
	t.equal(sort.$$$(f([ 2, 1, 4, 3, 5 ], 3, (x) => -x)), [ 3, 4, 5 ])
})

testVariants("array.minNWith", minNWith, (t, f) => {
	t.equal(f([], 3, (a, b) => b - a), [])
	t.equal(f([ 1 ], 3, (a, b) => b - a), [ 1 ])
	t.equal(f([ 3, 1, 2 ], 0, (a, b) => b - a), [])
	t.equal(sort.$$$(f([ 2, 1, 3 ], 3, (a, b) => b - a)), [ 1, 2, 3 ])
	t.equal(sort.$$$(f([ 2, 1, 4, 3, 5 ], 3, (a, b) => b - a)), [ 3, 4, 5 ])
	t.equal(sort.$$$(f([ 2, 1, 4, 3, 5 ], 3, (a, b) => a - b)), [ 1, 2, 3 ])
})

testVariants("array.minNIndex", minNIndex, (t, f) => {
	t.equal(f([], 3), [])
	t.equal(f([ 1 ], 3), [ 0 ])
	t.equal(f([ 3, 1, 2 ], 0), [])
	t.equal(sort.$$$(f([ 2, 1, 3 ], 3)), [ 0, 1, 2 ])
	t.equal(sort.$$$(f([ 2, 1, 4, 3, 5 ], 3)), [ 0, 1, 3 ])
})

testVariants("array.minNIndexBy", minNIndexBy, (t, f) => {
	t.equal(f([], 3, (x) => -x), [])
	t.equal(f([ 1 ], 3, (x) => -x), [ 0 ])
	t.equal(f([ 3, 1, 2 ], 0, (x) => -x), [])
	t.equal(sort.$$$(f([ 2, 1, 3 ], 3, (x) => -x)), [ 0, 1, 2 ])
	t.equal(sort.$$$(f([ 2, 1, 4, 3, 5 ], 3, (x) => -x)), [ 2, 3, 4 ])
})

testVariants("array.minNIndexWith", minNIndexWith, (t, f) => {
	t.equal(f([], 3, (a, b) => b - a), [])
	t.equal(f([ 1 ], 3, (a, b) => b - a), [ 0 ])
	t.equal(f([ 3, 1, 2 ], 0, (a, b) => b - a), [])
	t.equal(sort.$$$(f([ 2, 1, 3 ], 3, (a, b) => b - a)), [ 0, 1, 2 ])
	t.equal(sort.$$$(f([ 2, 1, 4, 3, 5 ], 3, (a, b) => b - a)), [ 2, 3, 4 ])
	t.equal(sort.$$$(f([ 2, 1, 4, 3, 5 ], 3, (a, b) => a - b)), [ 0, 1, 3 ])
})

test("array.__minN", (t) => {
	const call = (src, srcStart, srcEnd, n, fnCmp = compare) => {
		const copy = Array.from(src)
		const dst = [ 'y', 'y', 'y', 'y', 'y', 'y' ]
		const count = __minN(dst, 2, src, srcStart, srcEnd, n, fnCmp)
		t.equal(src, copy)
		t.equal(dst.slice(0, 2), [ 'y', 'y' ])
		t.equal(dst.slice(2 + count), new Array(4 - count).fill('y'))
		const entries = dst.slice(2, 2 + count).map(({ index, item }) => [ index, item ])
		entries.sort((a, b) => a[0] - b[0])
		return { count, entries }
	}

	const src = [ -100, 1, 5, 2, 4, 3, -100 ]
	t.equal(call(src, 1, 6, 3), { count: 3, entries: [ [ 1, 1 ], [ 3, 2 ], [ 5, 3 ] ] })
	t.equal(call(src, 1, 3, 10), { count: 2, entries: [ [ 1, 1 ], [ 2, 5 ] ] })
	t.equal(call(src, 1, 6, 2, (a, b) => b - a).count, 2)
	t.equal(call(src, 2, 5, 2, (a, b) => b - a), { count: 2, entries: [ [ 2, 5 ], [ 4, 4 ] ] })
	t.equal(call(src, 3, 4, 3), { count: 1, entries: [ [ 3, src[3] ] ] })
	t.equal(call(src, 3, 3, 3), { count: 0, entries: [] })
	t.equal(call(src, 1, 6, 0), { count: 0, entries: [] })

	const big = [ -100, 1, 8, 3, 6, 5, 4, 7, 2, 9, 0, -100 ]
	t.equal(call(big, 1, 11, 3), { count: 3, entries: [ [ 1, 1 ], [ 8, 2 ], [ 10, 0 ] ] })
	t.equal(call(big, 1, 11, 3, (a, b) => b - a), { count: 3, entries: [ [ 2, 8 ], [ 7, 7 ], [ 9, 9 ] ] })
})
