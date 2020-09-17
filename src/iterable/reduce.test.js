const { test } = require('@xyz/testing')
const { reduce } = require('.')

test('iterable.reduce', (t) => {
	t.equal([ ...reduce([], () => {}) ], [])
	t.equal([ ...reduce([], () => {}, 10) ], [])
	t.equal([ ...reduce([ 1, 2, 3 ], (a, x) => x) ], [ 3 ])
	t.equal([ ...reduce([ 1, 2, 3 ], (a, x) => a + x) ], [ 6 ])
	t.equal([ ...reduce([ 1, 2, 3 ], (a, x) => a + x, 10) ], [ 16 ])
})
