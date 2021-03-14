const { test } = require('@xyz/testing')
const { concat } = require('./concat')

test("array.concat", (t) => {
	t.equal(concat([]), [])
	t.equal(concat([ [] ]), [])
	t.equal(concat([ [], [], [] ]), [])
	t.equal(concat([ [ 1, 2, 3 ] ]), [ 1, 2, 3 ])
	t.equal(concat([ [ 1 ], [ 2 ], [ 3 ] ]), [ 1, 2, 3 ])
	t.equal(concat([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
	t.equal(concat([ [ [] ], [ {} ], [ null ], [ undefined ] ]), [ [], {}, null, undefined ])
})
