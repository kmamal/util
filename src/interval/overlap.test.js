const { test } = require('@xyz/testing')
const { overlap } = require('./overlap')

test('interval.overlap', (t) => {
	t.ok(overlap([ 1, 2 ], [ 1, 2 ]))
	t.ok(overlap([ 1, 3 ], [ 2, 4 ]))
	t.ok(overlap([ 2, 4 ], [ 1, 3 ]))
	t.ok(overlap([ 1, 4 ], [ 2, 3 ]))
	t.ok(overlap([ 2, 3 ], [ 1, 4 ]))
	t.ok(!overlap([ 1, 2 ], [ 3, 4 ]))
	t.ok(!overlap([ 3, 4 ], [ 1, 2 ]))
})
