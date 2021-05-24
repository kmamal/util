const { test } = require('@kmamal/testing')
const { includes } = require('./includes')

test("interval.includes", (t) => {
	const interval = [ 2, 4 ]

	t.ok(!includes(interval, 1))
	t.ok(includes(interval, 2))
	t.ok(includes(interval, 3))
	t.ok(includes(interval, 4))
	t.ok(!includes(interval, 5))

	t.ok(!includes(interval, NaN))
})
