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
