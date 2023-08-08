const { test } = require('@kmamal/testing')
const { minN, minNBy, minNIndex, minNIndexBy } = require('./min-n')
const { sort } = require('./sort')

test("array.minN", (t) => {
	t.equal(minN([], 3), [])
	t.equal(minN([ 1 ], 3), [ 1 ])
	t.equal(sort.$$$(minN([ 2, 1, 3 ], 3)), [ 1, 2, 3 ])
	t.equal(sort.$$$(minN([ 2, 1, 4, 3, 5 ], 3)), [ 1, 2, 3 ])
})

test("array.minNBy", (t) => {
	t.equal(minNBy([], 3, (x) => -x), [])
	t.equal(minNBy([ 1 ], 3, (x) => -x), [ 1 ])
	t.equal(sort.$$$(minNBy([ 2, 1, 3 ], 3, (x) => -x)), [ 1, 2, 3 ])
	t.equal(sort.$$$(minNBy([ 2, 1, 4, 3, 5 ], 3, (x) => -x)), [ 3, 4, 5 ])
})

test("array.minNIndex", (t) => {
	t.equal(minNIndex([], 3), [])
	t.equal(minNIndex([ 1 ], 3), [ 0 ])
	t.equal(sort.$$$(minNIndex([ 2, 1, 3 ], 3)), [ 0, 1, 2 ])
	t.equal(sort.$$$(minNIndex([ 2, 1, 4, 3, 5 ], 3)), [ 0, 1, 3 ])
})

test("array.minNIndexBy", (t) => {
	t.equal(minNIndexBy([], 3, (x) => -x), [])
	t.equal(minNIndexBy([ 1 ], 3, (x) => -x), [ 0 ])
	t.equal(sort.$$$(minNIndexBy([ 2, 1, 3 ], 3, (x) => -x)), [ 0, 1, 2 ])
	t.equal(sort.$$$(minNIndexBy([ 2, 1, 4, 3, 5 ], 3, (x) => -x)), [ 2, 3, 4 ])
})
