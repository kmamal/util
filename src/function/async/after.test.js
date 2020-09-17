const { test } = require('@xyz/testing')
const { after } = require('.')

test('function.async.after', (t) => {
	t.expect(3)
	const choked = after((x) => t.ok(x > 2), 2)
	choked(1)
	choked(2)
	choked(3)
	choked(4)
	choked(5)
})
