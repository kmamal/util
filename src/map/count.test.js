const { test } = require('@kmamal/testing')
const { count } = require('./count')

test("array.count", (t) => {
	t.equal(count([]), new Map())
	t.equal(count([ 1, 2, 3 ]), new Map([ [ 1, 1 ], [ 2, 1 ], [ 3, 1 ] ]))
	t.equal(count([ 1, 2, 3, 2, 1 ]), new Map([ [ 1, 2 ], [ 2, 2 ], [ 3, 1 ] ]))
})
