const { test } = require('@xyz/testing')
const { intersection, intersectionSorted } = require('.')

test('array.intersection', (t) => {
	t.equal(intersection([], []), [])
	t.equal(intersection([], [ 1 ]), [])
	t.equal(intersection([ 1 ], []), [])
	t.equal(intersection([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 2, 3 ])
})

test('array.intersection.$$$', (t) => {
	t.equal(intersection.$$$([], []), [])
	t.equal(intersection.$$$([], [ 1 ]), [])
	t.equal(intersection.$$$([ 1 ], []), [])
	t.equal(intersection.$$$([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 2, 3 ])
})

test('array.intersectionSorted', (t) => {
	t.equal(intersectionSorted([], []), [])
	t.equal(intersectionSorted([], [ 1 ]), [])
	t.equal(intersectionSorted([ 1 ], []), [])
	t.equal(intersectionSorted([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 2, 3 ])
})

test('array.intersectionSorted.$$$', (t) => {
	t.equal(intersectionSorted.$$$([], []), [])
	t.equal(intersectionSorted.$$$([], [ 1 ]), [])
	t.equal(intersectionSorted.$$$([ 1 ], []), [])
	t.equal(intersectionSorted.$$$([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 2, 3 ])
})
