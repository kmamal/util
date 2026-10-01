const { testVariants, junkObject } = require('../testing/test-variants')
const { test } = require('@kmamal/testing')
const { __copy, copyTo } = require('./copy')

testVariants("object.copy", copyTo, (t, f) => {
	t.equal(f({}), {})
	t.equal(f({ a: 2 }), { a: 2 })
	t.equal(f({ a: 1, b: 2 }), { a: 1, b: 2 })

	const res = f(JSON.parse('{"__proto__":{"x":1}}'))
	t.equal(Object.keys(res), [ '__proto__' ])
	t.equal(Object.getPrototypeOf(res), Object.prototype)
}, { base: null, to: copyTo, $$$: null, dst: junkObject })

test("object.__copy", (t) => {
	const src = { a: 1, b: { c: 2 } }
	const dst = { a: 0, x: 9 }
	t.equal(__copy(dst, src), undefined)
	t.equal(dst, { a: 1, x: 9, b: { c: 2 } })
	t.equal(dst.b, src.b)
	t.equal(src, { a: 1, b: { c: 2 } })

	const empty = { x: 1 }
	__copy(empty, {})
	t.equal(empty, { x: 1 })

	const inheriting = Object.create({ inherited: 1 })
	inheriting.own = 2
	Object.defineProperty(inheriting, 'hidden', { value: 3, enumerable: false })
	const fromInheriting = {}
	__copy(fromInheriting, inheriting)
	t.equal(fromInheriting, { own: 2 })

	const proto = { y: 1 }
	__copy(proto, JSON.parse('{"__proto__":{"x":1}}'))
	t.equal(Object.keys(proto), [ 'y', '__proto__' ])
	t.equal(Object.getPrototypeOf(proto), Object.prototype)
	t.equal(proto.x, undefined)
	t.equal(Object.getOwnPropertyDescriptor(proto, '__proto__').value, { x: 1 })
})
