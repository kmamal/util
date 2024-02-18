const { test } = require('@kmamal/testing')
const { fromEntries } = require('./from-entries')

test("object.from-entries", (t) => {
	t.equal(fromEntries([]), {})
	t.equal(fromEntries([ [ 'a', 1 ] ]), { a: 1 })
	t.equal(fromEntries([ [ 'a', 1 ], [ 'b', 2 ] ]), { a: 1, b: 2 })
})
