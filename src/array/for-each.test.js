const { test } = require('@kmamal/testing')
const { forEach } = require('./for-each')

test("array.forEach", (t) => {
	let sum
	const fn = (x) => { sum += x }

	sum = 0
	forEach([], fn)
	t.equal(sum, 0)

	sum = 0
	forEach([ 1 ], fn)
	t.equal(sum, 1)

	sum = 0
	forEach([ 1, 2, 3 ], fn)
	t.equal(sum, 6)
})
