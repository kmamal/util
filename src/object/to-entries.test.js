const { test } = require('@kmamal/testing')
const { toEntries } = require('./to-entries')

test("object.to-entries", (t) => {
	t.equal(toEntries({}), [])
	t.equal(toEntries({ a: 1 }), [ [ 'a', 1 ] ])
	t.equal(toEntries({ a: 1, b: 2 }), [ [ 'a', 1 ], [ 'b', 2 ] ])
})
