const { test } = require('@kmamal/testing')
const { mapKeys } = require('./map-keys')

test("object.map-keys", (t) => {
	t.equal(mapKeys({ a: 1, b: 2 }, (x) => x.repeat(2)), { aa: 1, bb: 2 })
})
