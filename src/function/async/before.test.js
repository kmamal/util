const { test } = require('@kmamal/testing')
const { before } = require('./before')

test("function.async.before", (t) => {
	t.expect(2)
	const choked = before((x) => t.ok(x < 3), 3)
	choked(1)
	choked(2)
	choked(3)
	choked(4)
	choked(5)
})
