const { test } = require('@kmamal/testing')
const { mapValues } = require('./map-values')

test("object.map-values", (t) => {
	t.equal(mapValues({ a: 1, b: 2 }, (x) => x * 2), { a: 2, b: 4 })
})
