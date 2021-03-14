const { test } = require('@xyz/testing')
const { filter } = require('./filter')

test("array.filter", (t) => {
	t.equal(filter([], () => {}), [])
	t.equal(filter([ 1, 2, 3 ], (x) => x % 2), [ 1, 3 ])
	t.equal(filter([ 1, 2, 3 ], () => false), [])
	t.equal(filter([ 1, 2, 3 ], () => true), [ 1, 2, 3 ])
})

test("array.filter.$$$", (t) => {
	t.equal(filter.$$$([], () => {}), [])
	t.equal(filter.$$$([ 1, 2, 3 ], (x) => x % 2), [ 1, 3 ])
	t.equal(filter.$$$([ 1, 2, 3 ], () => false), [])
	t.equal(filter.$$$([ 1, 2, 3 ], () => true), [ 1, 2, 3 ])
})
