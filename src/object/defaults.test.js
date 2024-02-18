const { test } = require('@kmamal/testing')
const { defaults } = require('./defaults')

test("object.defaults", (t) => {
	t.equal(defaults({}, {}), {})
	t.equal(defaults({ a: 1 }, {}), { a: 1 })
	t.equal(defaults({ a: 1 }, { a: 2 }), { a: 1 })
	t.equal(defaults({ a: 1 }, { b: 2 }), { a: 1, b: 2 })
})
