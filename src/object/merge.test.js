const { testVariants, junkObject } = require('../testing/test-variants')
const { merge } = require('./merge')
const { isEqual } = require('./is-equal')

testVariants('object.merge', merge, (t, f) => {
	t.equal(f({}, {}), {})
	t.equal(f({ a: 1 }, {}), { a: 1 })
	t.equal(f({ a: 1, b: 2 }, {}), { a: 1, b: 2 })
	t.equal(f({ a: 1, b: 2 }, { a: 3 }), { a: 3, b: 2 })
	t.equal(f({ a: 1, b: 2 }, { a: null }), { a: null, b: 2 })
	t.equal(f({ a: 1, b: 2 }, { c: 3 }), { a: 1, b: 2, c: 3 })
	t.equal(f({ a: 1, b: 2 }, { a: {} }), { a: {}, b: 2 })
	t.equal(f({ a: 1, b: 2 }, { a: [] }), { a: [], b: 2 })
	t.equal(f({ a: {}, b: 2 }, { a: [] }), { a: [], b: 2 })
	t.equal(f({ a: {}, b: 2 }, { a: {} }), { a: {}, b: 2 })
	t.equal(f({ a: {}, b: 2 }, { a: { c: 3 } }), { a: { c: 3 }, b: 2 })
	t.equal(f({ a: { c: 3 }, b: 2 }, { a: { c: 4 } }), { a: { c: 4 }, b: 2 })

	const res = f({}, JSON.parse('{"__proto__":{"x":1}}'))
	t.equal({}.x, undefined)
	t.equal(Object.keys(res), [ '__proto__' ])
	t.equal(Object.getPrototypeOf(res), Object.prototype)
}, { dst: junkObject })

testVariants('object.merge containers', merge, (t, f) => {
	const m = new Map([ [ 2, 2 ] ])
	const res = f({ m: new Map([ [ 1, 1 ] ]) }, { m })
	t.ok(isEqual(res.m, m))
	t.ok(res.m !== m)
	t.ok(f({ d: new Date(0) }, {}).d instanceof Date)
	t.ok(f({}, { d: new Date(0) }).d instanceof Date)
}, { dst: junkObject })

testVariants('object.merge clones b', merge, (t, f) => {
	const b = { x: { y: 1 }, z: [ 1 ] }
	const res = f({}, b)
	t.ok(res.x !== b.x)
	t.ok(res.z !== b.z)
	t.equal(res, b)
	const fn = () => 1
	t.equal(f({}, { f: fn }).f, fn)
}, { dst: junkObject })

testVariants('object.merge functions', merge, (t, f) => {
	const fn = () => 1
	t.equal(f({ f: fn }, {}).f, fn)
	t.equal(f({ a: { f: fn } }, { a: { b: 1 } }).a.f, fn)
	t.equal(f({}, { a: [ fn ] }).a[0], fn)
	t.equal(f({ a: [ fn ] }, {}).a[0], fn)
}, { dst: junkObject })

testVariants('object.merge symbols', merge, (t, f) => {
	const s = Symbol('s')
	const r = Symbol('r')
	const res = f({ a: 1, [s]: { x: 1 } }, { [s]: { y: 2 }, [r]: 3 })
	t.equal(res.a, 1)
	t.equal(res[s], { x: 1, y: 2 })
	t.equal(res[r], 3)
}, { dst: junkObject })

testVariants('object.merge cycles', merge, (t, f) => {
	const b = { x: 1 }
	b.self = b
	const res = f({ k: 1 }, b)
	t.equal([ res.k, res.x, res.self.x ], [ 1, 1, 1 ])
	t.equal(res.self.k, undefined)
	t.ok(res.self.self === res.self)

	const c = {}
	const d = { c }
	c.d = d
	const mutual = f({}, c)
	t.ok(mutual.d.c.d === mutual.d)

	const a = { x: 1 }
	a.self = a
	const fromA = f(a, { self: { z: 1 } })
	t.equal([ fromA.x, fromA.self.z ], [ 1, 1 ])
}, { dst: junkObject })

testVariants('object.merge shared objects in b', merge, (t, f) => {
	const s = { v: 1 }
	const res = f({ p: { x: 1 }, q: { y: 2 } }, { p: s, q: s })
	t.equal(res, { p: { x: 1, v: 1 }, q: { y: 2, v: 1 } })
	t.ok(res.p !== res.q)

	const fresh = f({}, { p: s, q: s })
	t.ok(fresh.p === fresh.q)
	t.ok(fresh.p !== s)
}, { dst: junkObject })

testVariants('object.merge arrays with plain prototypes', merge, (t, f) => {
	const arr = Object.setPrototypeOf([ 1, 2 ], null)
	const res = f({ a: { x: 1 } }, { a: arr })
	t.ok(Array.isArray(res.a))
	t.equal(res.a.length, 2)
	t.equal(Object.getPrototypeOf(res.a), null)
}, { dst: junkObject })
