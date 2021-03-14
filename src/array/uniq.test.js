const { test } = require('@xyz/testing')
const {
	uniq,
	uniqSorted,
	uniqBy,
	uniqBySorted,
	uniqByPure,
	uniqByPureSorted,
} = require('./uniq')

test("array.uniq", (t) => {
	t.equal(uniq([]), [])
	t.equal(uniq([ 1 ]), [ 1 ])
	t.equal(uniq([ 1, 2, 3 ]), [ 1, 2, 3 ])
	t.equal(uniq([ 1, 2, 2, 2, 3, 3 ]), [ 1, 2, 3 ])
	t.equal(uniq([ 1, 2, 3, 1, 2, 3, 1, 2, 3 ]), [ 1, 2, 3 ])
})

test("array.uniq.$$$", (t) => {
	t.equal(uniq.$$$([]), [])
	t.equal(uniq.$$$([ 1 ]), [ 1 ])
	t.equal(uniq.$$$([ 1, 2, 3 ]), [ 1, 2, 3 ])
	t.equal(uniq.$$$([ 1, 2, 2, 2, 3, 3 ]), [ 1, 2, 3 ])
	t.equal(uniq.$$$([ 1, 2, 3, 1, 2, 3, 1, 2, 3 ]), [ 1, 2, 3 ])
})

test("array.uniqSorted", (t) => {
	t.equal(uniqSorted([]), [])
	t.equal(uniqSorted([ 1 ]), [ 1 ])
	t.equal(uniqSorted([ 1, 2, 3 ]), [ 1, 2, 3 ])
	t.equal(uniqSorted([ 1, 2, 2, 2, 3, 3 ]), [ 1, 2, 3 ])
})

test("array.uniqSorted.$$$", (t) => {
	t.equal(uniqSorted.$$$([]), [])
	t.equal(uniqSorted.$$$([ 1 ]), [ 1 ])
	t.equal(uniqSorted.$$$([ 1, 2, 3 ]), [ 1, 2, 3 ])
	t.equal(uniqSorted.$$$([ 1, 2, 2, 2, 3, 3 ]), [ 1, 2, 3 ])
})

test("array.uniqBy", (t) => {
	t.equal(uniqBy([], (x) => 2 * x), [])
	t.equal(uniqBy([ 1 ], (x) => 2 * x), [ 1 ])
	t.equal(uniqBy([ 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(uniqBy([ 1, 2, 2, 2, 3, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(uniqBy([ 1, 2, 3, 1, 2, 3, 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
})

test("array.uniqBy.$$$", (t) => {
	t.equal(uniqBy.$$$([], (x) => 2 * x), [])
	t.equal(uniqBy.$$$([ 1 ], (x) => 2 * x), [ 1 ])
	t.equal(uniqBy.$$$([ 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(uniqBy.$$$([ 1, 2, 2, 2, 3, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(uniqBy.$$$([ 1, 2, 3, 1, 2, 3, 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
})

test("array.uniqBySorted", (t) => {
	t.equal(uniqBySorted([], (x) => 2 * x), [])
	t.equal(uniqBySorted([ 1 ], (x) => 2 * x), [ 1 ])
	t.equal(uniqBySorted([ 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(uniqBySorted([ 1, 2, 2, 2, 3, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
})

test("array.uniqBySorted.$$$", (t) => {
	t.equal(uniqBySorted.$$$([], (x) => 2 * x), [])
	t.equal(uniqBySorted.$$$([ 1 ], (x) => 2 * x), [ 1 ])
	t.equal(uniqBySorted.$$$([ 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(uniqBySorted.$$$([ 1, 2, 2, 2, 3, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
})

test("array.uniqByPure", (t) => {
	t.equal(uniqByPure([], (x) => 2 * x), [])
	t.equal(uniqByPure([ 1 ], (x) => 2 * x), [ 1 ])
	t.equal(uniqByPure([ 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(uniqByPure([ 1, 2, 2, 2, 3, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(uniqByPure([ 1, 2, 3, 1, 2, 3, 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
})

test("array.uniqByPure.$$$", (t) => {
	t.equal(uniqByPure.$$$([], (x) => 2 * x), [])
	t.equal(uniqByPure.$$$([ 1 ], (x) => 2 * x), [ 1 ])
	t.equal(uniqByPure.$$$([ 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(uniqByPure.$$$([ 1, 2, 2, 2, 3, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(uniqByPure.$$$([ 1, 2, 3, 1, 2, 3, 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
})

test("array.uniqByPureSorted", (t) => {
	t.equal(uniqByPureSorted([], (x) => 2 * x), [])
	t.equal(uniqByPureSorted([ 1 ], (x) => 2 * x), [ 1 ])
	t.equal(uniqByPureSorted([ 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(uniqByPureSorted([ 1, 2, 2, 2, 3, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
})

test("array.uniqByPureSorted.$$$", (t) => {
	t.equal(uniqByPureSorted.$$$([], (x) => 2 * x), [])
	t.equal(uniqByPureSorted.$$$([ 1 ], (x) => 2 * x), [ 1 ])
	t.equal(uniqByPureSorted.$$$([ 1, 2, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(uniqByPureSorted.$$$([ 1, 2, 2, 2, 3, 3 ], (x) => 2 * x), [ 1, 2, 3 ])
})
