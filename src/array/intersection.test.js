const { test } = require('@kmamal/testing')
const {
	intersection,
	intersectionSorted,
	intersectionBy,
	intersectionBySorted,
} = require('./intersection')

test("array.intersection", (t) => {
	t.equal(intersection([], []), [])
	t.equal(intersection([], [ 1 ]), [])
	t.equal(intersection([ 1 ], []), [])
	t.equal(intersection([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 2, 3 ])
})

test("array.intersection.$$$", (t) => {
	t.equal(intersection.$$$([], []), [])
	t.equal(intersection.$$$([], [ 1 ]), [])
	t.equal(intersection.$$$([ 1 ], []), [])
	t.equal(intersection.$$$([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 2, 3 ])
})

test("array.intersectionSorted", (t) => {
	t.equal(intersectionSorted([], []), [])
	t.equal(intersectionSorted([], [ 1 ]), [])
	t.equal(intersectionSorted([ 1 ], []), [])
	t.equal(intersectionSorted([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 2, 3 ])
})

test("array.intersectionSorted.$$$", (t) => {
	t.equal(intersectionSorted.$$$([], []), [])
	t.equal(intersectionSorted.$$$([], [ 1 ]), [])
	t.equal(intersectionSorted.$$$([ 1 ], []), [])
	t.equal(intersectionSorted.$$$([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 2, 3 ])
})

test("array.intersectionBy", (t) => {
	t.equal(intersectionBy([], [], (x) => 2 * x), [])
	t.equal(intersectionBy([], [ 1 ], (x) => 2 * x), [])
	t.equal(intersectionBy([ 1 ], [], (x) => 2 * x), [])
	t.equal(intersectionBy([ 1, 2, 3 ], [ 2, 3, 4 ], (x) => 2 * x), [ 2, 3 ])
})

test("array.intersectionBy.$$$", (t) => {
	t.equal(intersectionBy.$$$([], [], (x) => 2 * x), [])
	t.equal(intersectionBy.$$$([], [ 1 ], (x) => 2 * x), [])
	t.equal(intersectionBy.$$$([ 1 ], [], (x) => 2 * x), [])
	t.equal(intersectionBy.$$$([ 1, 2, 3 ], [ 2, 3, 4 ], (x) => 2 * x), [ 2, 3 ])
})

test("array.intersectionBySorted", (t) => {
	t.equal(intersectionBySorted([], [], (x) => 2 * x), [])
	t.equal(intersectionBySorted([], [ 1 ], (x) => 2 * x), [])
	t.equal(intersectionBySorted([ 1 ], [], (x) => 2 * x), [])
	t.equal(intersectionBySorted([ 1, 2, 3 ], [ 2, 3, 4 ], (x) => 2 * x), [ 2, 3 ])
})

test("array.intersectionBySorted.$$$", (t) => {
	t.equal(intersectionBySorted.$$$([], [], (x) => 2 * x), [])
	t.equal(intersectionBySorted.$$$([], [ 1 ], (x) => 2 * x), [])
	t.equal(intersectionBySorted.$$$([ 1 ], [], (x) => 2 * x), [])
	t.equal(intersectionBySorted.$$$([ 1, 2, 3 ], [ 2, 3, 4 ], (x) => 2 * x), [ 2, 3 ])
})
