const { test } = require('@xyz/testing')
const { covers } = require('./covers')

test("interval.covers", (t) => {
	t.ok(covers([ 1, 2 ], [ 1, 2 ]))
	t.ok(!covers([ 1, 3 ], [ 2, 4 ]))
	t.ok(!covers([ 2, 4 ], [ 1, 3 ]))
	t.ok(covers([ 1, 4 ], [ 2, 3 ]))
	t.ok(!covers([ 2, 3 ], [ 1, 4 ]))
	t.ok(!covers([ 1, 2 ], [ 3, 4 ]))
	t.ok(!covers([ 3, 4 ], [ 1, 2 ]))
})
