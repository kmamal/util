const { test } = require('@kmamal/testing')
const { empty$$$ } = require('./empty')

test("object.empty", (t) => {
	t.equal(empty$$$({}), {})
	t.equal(empty$$$({ a: 1 }), {})
	t.equal(empty$$$({ a: 1, b: 2 }), {})
})
