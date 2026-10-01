const { testVariants, junkObject } = require('../testing/test-variants')
const { test } = require('@kmamal/testing')
const { __mapEntries, mapEntries } = require('./map-entries')

testVariants("object.map-entries", mapEntries, (t, f) => {
	t.equal(f({}, ([ k, v ]) => [ k + k, v * 2 ]), {})
	t.equal(f({ a: 1, b: 2 }, ([ k, v ]) => [ k + k, v * 2 ]), { aa: 2, bb: 4 })

	const res = f({ a: 1 }, () => [ '__proto__', { x: 1 } ])
	t.equal(Object.keys(res), [ '__proto__' ])
	t.equal(Object.getPrototypeOf(res), Object.prototype)
}, { dst: junkObject })

test("object.__mapEntries", (t) => {
	const src = { a: 1, b: 2 }
	const dst = { aa: 0, x: 9 }
	const fn = ([ k, v ]) => [ k + k, v * 2 ]
	t.equal(__mapEntries(dst, src, fn), undefined)
	t.equal(dst, { aa: 2, x: 9, bb: 4 })
	t.equal(src, { a: 1, b: 2 })

	const fresh = {}
	__mapEntries(fresh, src, fn)
	t.equal(fresh, mapEntries(src, fn))

	const empty = { x: 1 }
	__mapEntries(empty, {}, fn)
	t.equal(empty, { x: 1 })

	const inheriting = Object.create({ inherited: 1 })
	inheriting.own = 2
	const fromInheriting = {}
	__mapEntries(fromInheriting, inheriting, fn)
	t.equal(fromInheriting, { ownown: 4 })

	const proto = { y: 1 }
	__mapEntries(proto, { a: 1 }, () => [ '__proto__', { x: 1 } ])
	t.equal(Object.keys(proto), [ 'y', '__proto__' ])
	t.equal(Object.getPrototypeOf(proto), Object.prototype)
	t.equal(proto.x, undefined)

	const fromProto = {}
	__mapEntries(fromProto, JSON.parse('{"__proto__":1}'), ([ k, v ]) => [ k, v + 1 ])
	t.equal(Object.keys(fromProto), [ '__proto__' ])
	t.equal(Object.getOwnPropertyDescriptor(fromProto, '__proto__').value, 2)
})
