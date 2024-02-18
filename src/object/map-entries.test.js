const { test } = require('@kmamal/testing')
const { mapEntries } = require('./map-entries')

test("object.map-entries", (t) => {
	t.equal(mapEntries({ a: 1, b: 2 }, ([ k, v ]) => [ k + k, v * 2 ]), { aa: 2, bb: 4 })
})
