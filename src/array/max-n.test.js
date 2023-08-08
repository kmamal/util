const { test } = require('@kmamal/testing')
const { maxN, maxNBy, maxNIndex, maxNIndexBy } = require('./max-n')
const { sort } = require('./sort')

test("array.maxN", (t) => {
	t.equal(maxN([], 3), [])
	t.equal(maxN([ 1 ], 3), [ 1 ])
	t.equal(sort.$$$(maxN([ 2, 1, 3 ], 3)), [ 1, 2, 3 ])
	t.equal(sort.$$$(maxN([ 2, 1, 4, 3, 5 ], 3)), [ 3, 4, 5 ])
})

test("array.maxNBy", (t) => {
	t.equal(maxNBy([], 3, (x) => -x), [])
	t.equal(maxNBy([ 1 ], 3, (x) => -x), [ 1 ])
	t.equal(sort.$$$(maxNBy([ 2, 1, 3 ], 3, (x) => -x)), [ 1, 2, 3 ])
	t.equal(sort.$$$(maxNBy([ 2, 1, 4, 3, 5 ], 3, (x) => -x)), [ 1, 2, 3 ])
})

test("array.maxNIndex", (t) => {
	t.equal(maxNIndex([], 3), [])
	t.equal(maxNIndex([ 1 ], 3), [ 0 ])
	t.equal(sort.$$$(maxNIndex([ 2, 1, 3 ], 3)), [ 0, 1, 2 ])
	t.equal(sort.$$$(maxNIndex([ 2, 1, 4, 3, 5 ], 3)), [ 2, 3, 4 ])
})

test("array.maxNIndexBy", (t) => {
	t.equal(maxNIndexBy([], 3, (x) => -x), [])
	t.equal(maxNIndexBy([ 1 ], 3, (x) => -x), [ 0 ])
	t.equal(sort.$$$(maxNIndexBy([ 2, 1, 3 ], 3, (x) => -x)), [ 0, 1, 2 ])
	t.equal(sort.$$$(maxNIndexBy([ 2, 1, 4, 3, 5 ], 3, (x) => -x)), [ 0, 1, 3 ])
})
