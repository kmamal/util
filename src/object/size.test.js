const { test } = require('@kmamal/testing')
const { size } = require('./size')

test("object.size", (t) => {
	t.equal(size({ }), 0)
	t.equal(size({ a: 1 }), 1)
	t.equal(size({ a: 1, b: 2 }), 2)
})
