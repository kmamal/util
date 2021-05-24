const { test } = require('@kmamal/testing')
const { intersection } = require('./intersection')
const { from } = require('./from')

test("intervals.intersection", (t) => {
	t.equal(intersection([ 1, 2 ], [ 2, 3 ]), [ 2, 2 ])
	t.equal(intersection([ 2, 3 ], [ 1, 2 ]), [ 2, 2 ])
	t.equal(intersection([ 1, 3 ], [ 2, 4 ]), [ 2, 3 ])
	t.equal(intersection([ 2, 4 ], [ 1, 3 ]), [ 2, 3 ])
	t.equal(intersection([ 1, 4 ], [ 2, 3 ]), [ 2, 3 ])
	t.equal(intersection([ 2, 3 ], [ 1, 4 ]), [ 2, 3 ])

	t.equal(intersection([ 1, 2 ], [ 3, 4 ]), null)
	t.equal(intersection(from(1, 2, false, true), from(2, 3, true, false)), null)
})
