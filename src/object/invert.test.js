const { test } = require('@kmamal/testing')
const { invert } = require('./invert')

test("object.invert", (t) => {
	t.equal(invert({}), {})
	t.equal(invert({ a: 'x', b: 'y' }), { x: 'a', y: 'b' })
	t.equal(invert({ a: 'x', b: 'x' }), { x: [ 'a', 'b' ] })
	t.equal(invert({ a: [ 'x', 'y' ] }), { x: 'a', y: 'a' })
})

test("object.invert inherited keys", (t) => {
	t.equal(invert({ a: 'constructor' }).constructor, 'a')
	const res = invert({ a: '__proto__' })
	t.equal(Object.keys(res), [ '__proto__' ])
	t.equal(Object.getPrototypeOf(res), Object.prototype)
})
