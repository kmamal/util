const { test } = require('@kmamal/testing')
const { size } = require('./size')

test("object.size", (t) => {
	t.equal(size({ }), 0)
	t.equal(size({ a: 1 }), 1)
	t.equal(size({ a: 1, b: 2 }), 2)
})

test("object.size symbols", (t) => {
	const obj = { a: 1, [Symbol('s')]: 2 }
	Object.defineProperty(obj, Symbol('hidden'), { value: 3, enumerable: false })
	t.equal(size(obj), 2)
})
