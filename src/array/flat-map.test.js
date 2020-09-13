const { test } = require('@xyz/tests')
const { flatMap } = require('.')

test('array.flatMap', (t) => {
	t.equal(flatMap([], () => {}), [])
	t.equal(flatMap([], () => [ 1, 2, 3 ]), [])
	t.equal(flatMap([ 1 ], (x) => [ x ]), [ 1 ])
	t.equal(flatMap([ 1, 2, 3 ], () => []), [])
	t.equal(flatMap([ 1, 2, 3 ], (x) => [ x ]), [ 1, 2, 3 ])
	t.equal(flatMap([ 1, 2, 3 ], (x) => [ x * 2 ]), [ 2, 4, 6 ])
	t.equal(flatMap([ 1, 2, 3 ], (x) => [ x, x * 2 ]), [ 1, 2, 2, 4, 3, 6 ])
})
