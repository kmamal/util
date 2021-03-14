const { test } = require('@xyz/testing')
const { every } = require('./every')

test("array.every", (t) => {
	t.equal(every([], () => false), true)
	t.equal(every([ 1, 2, 3 ], () => false), false)
	t.equal(every([ 1, 2, 3 ], () => true), true)
	t.equal(every([ 1, 2, 3 ], (x) => x < 5), true)
	t.equal(every([ 1, 2, 3 ], (x) => x < 2), false)
})
