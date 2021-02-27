const { test } = require('@xyz/testing')
const { scan } = require('.')

test("iterable.scan", (t) => {
	t.equal([ ...scan([], () => {}) ], [])
	t.equal([ ...scan([], () => {}, 10) ], [])
	t.equal([ ...scan([ 1, 2, 3 ], (a, x) => x) ], [ 1, 2, 3 ])
	t.equal([ ...scan([ 1, 2, 3 ], (a, x) => a + x) ], [ 1, 3, 6 ])
	t.equal([ ...scan([ 1, 2, 3 ], (a, x) => a + x, 10) ], [ 11, 13, 16 ])
})
