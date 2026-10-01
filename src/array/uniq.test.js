const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const {
	__uniq,
	uniqWith,
	uniqBy,
	uniq,
	uniqWithSorted,
	uniqBySorted,
	uniqSorted,
} = require('./uniq')

const tens = (x) => Math.floor(x / 10)

testVariants("array.uniq", uniq, (t, f) => {
	t.equal(f([]), [])
	t.equal(f([ 1 ]), [ 1 ])
	t.equal(f([ 1, 2, 3 ]), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 2, 2, 3, 3 ]), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 3, 1, 2, 3, 1, 2, 3 ]), [ 1, 2, 3 ])
})

testVariants("array.uniqBy", uniqBy, (t, f) => {
	t.equal(f([], (x) => 2 * x), [])
	t.equal(f([ 1 ], (x) => 2 * x), [ 1 ])
	t.equal(f([ 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 2, 2, 3, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 3, 1, 2, 3, 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(f([ 1, 12, 15, 2, 23 ], tens), [ 1, 12, 23 ])
})

testVariants("array.uniqWith", uniqWith, (t, f) => {
	t.equal(f([], (a, b) => a === b), [])
	t.equal(f([ 1 ], (a, b) => a === b), [ 1 ])
	t.equal(f([ 1, 2, 3 ], (a, b) => a === b), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 2, 2, 3, 3 ], (a, b) => a === b), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 3, 1, 2, 3, 1, 2, 3 ], (a, b) => a === b), [ 1, 2, 3 ])
	t.equal(f([ 1, 12, 15, 2, 23 ], (a, b) => tens(a) === tens(b)), [ 1, 12, 23 ])
})

testVariants("array.uniqSorted", uniqSorted, (t, f) => {
	t.equal(f([]), [])
	t.equal(f([ 1 ]), [ 1 ])
	t.equal(f([ 1, 2, 3 ]), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 2, 2, 3, 3 ]), [ 1, 2, 3 ])
})

testVariants("array.uniqBySorted", uniqBySorted, (t, f) => {
	t.equal(f([], (x) => 2 * x), [])
	t.equal(f([ 1 ], (x) => 2 * x), [ 1 ])
	t.equal(f([ 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 2, 2, 3, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 12, 15, 23 ], tens), [ 1, 12, 23 ])
})

testVariants("array.uniqWithSorted", uniqWithSorted, (t, f) => {
	t.equal(f([], (a, b) => a - b), [])
	t.equal(f([ 1 ], (a, b) => a - b), [ 1 ])
	t.equal(f([ 1, 2, 3 ], (a, b) => a - b), [ 1, 2, 3 ])
	t.equal(f([ 1, 2, 2, 2, 3, 3 ], (a, b) => a - b), [ 1, 2, 3 ])
	t.equal(f([ 3, 3, 2, 1, 1 ], (a, b) => b - a), [ 3, 2, 1 ])
	t.equal(f([ 1, 2, 12, 15, 23 ], (a, b) => tens(a) - tens(b)), [ 1, 12, 23 ])
})

test("array.__uniq", (t) => {
	const fnEq = (a, b) => a === b
	const src = [ 1, 2, 3, 2, 1, 4, 3, 5 ]
	const call = (srcStart, srcEnd) => {
		const dst = [ 2, 3, 'y', 'y', 'y', 'y', 'y', 'y' ]
		const count = __uniq(dst, 2, src, srcStart, srcEnd, fnEq)
		return { count, dst }
	}

	t.equal(call(1, 7), { count: 4, dst: [ 2, 3, 2, 3, 1, 4, 'y', 'y' ] })
	t.equal(call(1, 7).dst.slice(2, 6), uniqWith(src.slice(1, 7), fnEq))
	t.equal(call(3, 5), { count: 2, dst: [ 2, 3, 2, 1, 'y', 'y', 'y', 'y' ] })
	t.equal(call(2, 3), { count: 1, dst: [ 2, 3, 3, 'y', 'y', 'y', 'y', 'y' ] })
	t.equal(call(2, 2), { count: 0, dst: [ 2, 3, 'y', 'y', 'y', 'y', 'y', 'y' ] })
	t.equal(src, [ 1, 2, 3, 2, 1, 4, 3, 5 ])
})
