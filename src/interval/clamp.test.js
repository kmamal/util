const { test } = require('@xyz/testing')
const { clamp } = require('./clamp')

test("interval.clamp", (t) => {
	const interval = [ 2, 4 ]

	t.equal(clamp(interval, 1), 2)
	t.equal(clamp(interval, 2), 2)
	t.equal(clamp(interval, 3), 3)
	t.equal(clamp(interval, 4), 4)
	t.equal(clamp(interval, 5), 4)

	t.equal(clamp(interval, NaN), NaN)
})
