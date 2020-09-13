const { test } = require('@xyz/tests')
const { difference, differenceSorted } = require('.')

test('array.difference', (t) => {
	t.equal(difference([], []), [])
	t.equal(difference([], [ 1 ]), [])
	t.equal(difference([ 1 ], []), [ 1 ])
	t.equal(difference([ 1, 2, 3 ], []), [ 1, 2, 3 ])
	t.equal(difference([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 1 ])
})

test('array.difference.$$$', (t) => {
	t.equal(difference.$$$([], []), [])
	t.equal(difference.$$$([], [ 1 ]), [])
	t.equal(difference.$$$([ 1 ], []), [ 1 ])
	t.equal(difference.$$$([ 1, 2, 3 ], []), [ 1, 2, 3 ])
	t.equal(difference.$$$([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 1 ])
})

test('array.differenceSorted', (t) => {
	t.equal(differenceSorted([], []), [])
	t.equal(differenceSorted([], [ 1 ]), [])
	t.equal(differenceSorted([ 1 ], []), [ 1 ])
	t.equal(differenceSorted([ 1, 2, 3 ], []), [ 1, 2, 3 ])
	t.equal(differenceSorted([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 1 ])
})

test('array.differenceSorted.$$$', (t) => {
	t.equal(differenceSorted.$$$([], []), [])
	t.equal(differenceSorted.$$$([], [ 1 ]), [])
	t.equal(differenceSorted.$$$([ 1 ], []), [ 1 ])
	t.equal(differenceSorted.$$$([ 1, 2, 3 ], []), [ 1, 2, 3 ])
	t.equal(differenceSorted.$$$([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 1 ])
})
