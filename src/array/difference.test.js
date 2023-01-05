const { test } = require('@kmamal/testing')
const {
	difference,
	differenceSorted,
	differenceBy,
	differenceBySorted,
} = require('./difference')

test("array.difference", (t) => {
	t.equal(difference([], []), [])
	t.equal(difference([], [ 1 ]), [])
	t.equal(difference([ 1 ], []), [ 1 ])
	t.equal(difference([ 1, 2, 3 ], []), [ 1, 2, 3 ])
	t.equal(difference([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 1 ])
})

test("array.difference.$$$", (t) => {
	t.equal(difference.$$$([], []), [])
	t.equal(difference.$$$([], [ 1 ]), [])
	t.equal(difference.$$$([ 1 ], []), [ 1 ])
	t.equal(difference.$$$([ 1, 2, 3 ], []), [ 1, 2, 3 ])
	t.equal(difference.$$$([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 1 ])
})

test("array.differenceSorted", (t) => {
	t.equal(differenceSorted([], []), [])
	t.equal(differenceSorted([], [ 1 ]), [])
	t.equal(differenceSorted([ 1 ], []), [ 1 ])
	t.equal(differenceSorted([ 1, 2, 3 ], []), [ 1, 2, 3 ])
	t.equal(differenceSorted([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 1 ])
})

test("array.differenceSorted.$$$", (t) => {
	t.equal(differenceSorted.$$$([], []), [])
	t.equal(differenceSorted.$$$([], [ 1 ]), [])
	t.equal(differenceSorted.$$$([ 1 ], []), [ 1 ])
	t.equal(differenceSorted.$$$([ 1, 2, 3 ], []), [ 1, 2, 3 ])
	t.equal(differenceSorted.$$$([ 1, 2, 3 ], [ 2, 3, 4 ]), [ 1 ])
})

test("array.differenceBy", (t) => {
	t.equal(differenceBy([], [], (x) => 2 * x), [])
	t.equal(differenceBy([], [ 1 ], (x) => 2 * x), [])
	t.equal(differenceBy([ 1 ], [], (x) => 2 * x), [ 1 ])
	t.equal(differenceBy([ 1, 2, 3 ], [], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(differenceBy([ 1, 2, 3 ], [ 2, 3, 4 ], (x) => 2 * x), [ 1 ])
})

test("array.differenceBy.$$$", (t) => {
	t.equal(differenceBy.$$$([], [], (x) => 2 * x), [])
	t.equal(differenceBy.$$$([], [ 1 ], (x) => 2 * x), [])
	t.equal(differenceBy.$$$([ 1 ], [], (x) => 2 * x), [ 1 ])
	t.equal(differenceBy.$$$([ 1, 2, 3 ], [], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(differenceBy.$$$([ 1, 2, 3 ], [ 2, 3, 4 ], (x) => 2 * x), [ 1 ])
})

test("array.differenceBySorted", (t) => {
	t.equal(differenceBySorted([], [], (x) => 2 * x), [])
	t.equal(differenceBySorted([], [ 1 ], (x) => 2 * x), [])
	t.equal(differenceBySorted([ 1 ], [], (x) => 2 * x), [ 1 ])
	t.equal(differenceBySorted([ 1, 2, 3 ], [], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(differenceBySorted([ 1, 2, 3 ], [ 2, 3, 4 ], (x) => 2 * x), [ 1 ])
})

test("array.differenceBySorted.$$$", (t) => {
	t.equal(differenceBySorted.$$$([], [], (x) => 2 * x), [])
	t.equal(differenceBySorted.$$$([], [ 1 ], (x) => 2 * x), [])
	t.equal(differenceBySorted.$$$([ 1 ], [], (x) => 2 * x), [ 1 ])
	t.equal(differenceBySorted.$$$([ 1, 2, 3 ], [], (x) => 2 * x), [ 1, 2, 3 ])
	t.equal(differenceBySorted.$$$([ 1, 2, 3 ], [ 2, 3, 4 ], (x) => 2 * x), [ 1 ])
})
