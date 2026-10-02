const { testVariants, junkObject } = require('../testing/test-variants')
const { test } = require('@kmamal/testing')
const { __mapValues, mapValues } = require('./map-values')

testVariants("object.map-values", mapValues, (t, f) => {
	t.equal(f({}, (x) => x * 2), {})
	t.equal(f({ a: 1, b: 2 }, (x) => x * 2), { a: 2, b: 4 })

	const res = f(JSON.parse('{"__proto__":{"x":1}}'), (x) => x)
	t.equal(Object.keys(res), [ '__proto__' ])
	t.equal(Object.getPrototypeOf(res), Object.prototype)
}, { dst: junkObject })

test("object.__mapValues", (t) => {
	const src = { a: 1, b: 2 }
	const dst = { a: 0, x: 9 }
	const fn = (x) => x * 2
	t.equal(__mapValues(dst, src, fn), undefined)
	t.equal(dst, { a: 2, x: 9, b: 4 })
	t.equal(src, { a: 1, b: 2 })

	const fresh = {}
	__mapValues(fresh, src, fn)
	t.equal(fresh, mapValues(src, fn))

	const empty = { x: 1 }
	__mapValues(empty, {}, fn)
	t.equal(empty, { x: 1 })

	const inheriting = Object.create({ inherited: 1 })
	inheriting.own = 2
	const fromInheriting = {}
	__mapValues(fromInheriting, inheriting, fn)
	t.equal(fromInheriting, { own: 4 })

	const proto = { y: 1 }
	__mapValues(proto, JSON.parse('{"__proto__":{"x":1}}'), (x) => x)
	t.equal(Object.keys(proto), [ 'y', '__proto__' ])
	t.equal(Object.getPrototypeOf(proto), Object.prototype)
	t.equal(proto.x, undefined)
	t.equal(Object.getOwnPropertyDescriptor(proto, '__proto__').value, { x: 1 })
})

testVariants("object.map-values symbols", mapValues, (t, f) => {
	const s = Symbol('s')
	const res = f({ a: 1, [s]: 2 }, (x) => x * 10)
	t.equal(Reflect.ownKeys(res), [ 'a', s ])
	t.equal(res[s], 20)
}, { dst: junkObject })
