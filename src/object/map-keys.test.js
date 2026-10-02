const { testVariants, junkObject } = require('../testing/test-variants')
const { test } = require('@kmamal/testing')
const { __mapKeys, mapKeys } = require('./map-keys')

testVariants("object.map-keys", mapKeys, (t, f) => {
	t.equal(f({}, (x) => x.repeat(2)), {})
	t.equal(f({ a: 1, b: 2 }, (x) => x.repeat(2)), { aa: 1, bb: 2 })

	const res = f({ a: { x: 1 } }, () => '__proto__')
	t.equal(Object.keys(res), [ '__proto__' ])
	t.equal(Object.getPrototypeOf(res), Object.prototype)
}, { dst: junkObject })

test("object.__mapKeys", (t) => {
	const src = { a: 1, b: 2 }
	const dst = { aa: 0, x: 9 }
	const fn = (x) => x.repeat(2)
	t.equal(__mapKeys(dst, src, fn), undefined)
	t.equal(dst, { aa: 1, x: 9, bb: 2 })
	t.equal(src, { a: 1, b: 2 })

	const fresh = {}
	__mapKeys(fresh, src, fn)
	t.equal(fresh, mapKeys(src, fn))

	const empty = { x: 1 }
	__mapKeys(empty, {}, fn)
	t.equal(empty, { x: 1 })

	const inheriting = Object.create({ inherited: 1 })
	inheriting.own = 2
	const fromInheriting = {}
	__mapKeys(fromInheriting, inheriting, fn)
	t.equal(fromInheriting, { ownown: 2 })

	const proto = { y: 1 }
	__mapKeys(proto, { a: { x: 1 } }, () => '__proto__')
	t.equal(Object.keys(proto), [ 'y', '__proto__' ])
	t.equal(Object.getPrototypeOf(proto), Object.prototype)
	t.equal(proto.x, undefined)

	const fromProto = {}
	__mapKeys(fromProto, JSON.parse('{"__proto__":1}'), (k) => `${k}!`)
	t.equal(fromProto, { '__proto__!': 1 })
})

testVariants("object.map-keys symbols", mapKeys, (t, f) => {
	const s = Symbol('s')
	const res = f({ a: 1, [s]: 2 }, (x) => typeof x === 'symbol' ? x : x.repeat(2))
	t.equal(Reflect.ownKeys(res), [ 'aa', s ])
	t.equal(res[s], 2)
}, { dst: junkObject })
