const { test } = require('@kmamal/testing')
const { copyTo } = require('./copy')

test("object.copy", (t) => {
	t.equal(copyTo({}, {}), {})
	t.equal(copyTo({ a: 1 }, {}), {})
	t.equal(copyTo({ a: 1 }, { a: 2 }), { a: 2 })
	t.equal(copyTo({ a: 1 }, { b: 2 }), { b: 2 })
})
