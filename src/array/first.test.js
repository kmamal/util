const { test } = require('@kmamal/testing')
const { first } = require('./first')

test("array.first", (t) => {
	t.equal(first([]), undefined)
	t.equal(first([ 1 ]), 1)
	t.equal(first([ 2, 1, 3 ]), 2)
})
