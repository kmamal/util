const { test } = require('@kmamal/testing')
const { zip } = require('./zip')

test("object.zip", (t) => {
	t.equal(zip([], []), {})
	t.equal(zip([ 'a' ], [ 1 ]), { a: 1 })
	t.equal(zip([ 'a', 'b' ], [ 1, 2 ]), { a: 1, b: 2 })
})
