const { test } = require('@kmamal/testing')
const { testVariants, junkObject } = require('../testing/test-variants')
const { __makeSteps, __get, __set, get, set } = require('./accessors')

test("object.accessors.__makeSteps", (t) => {
	t.equal(__makeSteps('a'), [ 'a' ])
	t.equal(__makeSteps('a.b'), [ 'a', 'b' ])
	t.equal(__makeSteps('a[1]'), [ 'a', '1' ])
	t.equal(__makeSteps('a[10].b'), [ 'a', '10', 'b' ])
	t.equal(__makeSteps('a[xy].z'), [ 'a', 'xy', 'z' ])
})

test("object.accessors.get", (t) => {
	t.equal(get({ a: { b: 1 } }, 'a.b'), 1)
	t.equal(get({ a: Array.from({ length: 11 }, (_, i) => i) }, 'a[10]'), 10)
	t.equal(get({}, '__proto__'), undefined)
})

testVariants("object.accessors.set", set, (t, f) => {
	t.equal(f({ a: { b: 1 }, c: [ 1, 2 ] }, 'a.b', 2), { a: { b: 2 }, c: [ 1, 2 ] })
	t.equal(f({ a: { b: 1 }, c: [ 1, 2 ] }, 'a.b', 3), { a: { b: 3 }, c: [ 1, 2 ] })
	t.equal(f({ a: { b: 1 }, c: [ 1, 2 ] }, 'c[0]', 9), { a: { b: 1 }, c: [ 9, 2 ] })

	const res = f({}, '__proto__', { x: 1 })
	t.equal(Object.keys(res), [ '__proto__' ])
	t.equal({}.x, undefined)
}, { dst: junkObject })

test("object.accessors.set does not mutate", (t) => {
	const obj = { a: { b: 1 }, c: [ 1, 2 ] }
	set(obj, 'a.b', 2)
	set(obj, 'c[0]', 9)
	t.equal(obj, { a: { b: 1 }, c: [ 1, 2 ] })
	set.to({}, obj, 'a.b', 3)
	set.to({}, obj, 'c[0]', 9)
	t.equal(obj, { a: { b: 1 }, c: [ 1, 2 ] })
})

test("object.accessors.__get", (t) => {
	const obj = { a: { b: [ 1, { c: 2 } ] } }
	t.equal(__get(obj, []), obj)
	t.equal(__get(obj, [ 'a' ]), obj.a)
	t.equal(__get(obj, [ 'a', 'b', '1', 'c' ]), 2)
	t.equal(__get(obj, [ 'a', 'b', '0' ]), 1)
	t.equal(__get(obj, [ 'a', 'x' ]), undefined)
	t.equal(__get(obj, [ 'a', 'b', 'length' ]), 2)
	t.equal(__get(obj, [ 'a', 'toString' ]), Object.prototype.toString)
	t.equal(__get(obj, [ '__proto__' ]), undefined)
	t.equal(__get(obj, [ 'a', '__proto__' ]), undefined)

	const own = JSON.parse('{"__proto__":{"x":1}}')
	t.equal(__get(own, [ '__proto__', 'x' ]), 1)
	t.equal(__get({ a: own }, [ 'a', '__proto__' ]), { x: 1 })
})

test("object.accessors.__set", (t) => {
	const inner = { b: 1 }
	const obj = { a: inner, c: [ 1, 2 ] }
	t.equal(__set(obj, [ 'a', 'b' ], 5), 1)
	t.equal(obj, { a: { b: 5 }, c: [ 1, 2 ] })
	t.equal(obj.a, inner)

	t.equal(__set(obj, [ 'c', '1' ], 9), 2)
	t.equal(obj.c, [ 1, 9 ])

	t.equal(__set(obj, [ 'a', 'd' ], 3), undefined)
	t.equal(obj.a, { b: 5, d: 3 })

	t.equal(__set(obj, [ 'e' ], 4), undefined)
	t.equal(obj, { a: { b: 5, d: 3 }, c: [ 1, 9 ], e: 4 })

	const inherited = {}
	t.equal(__set(inherited, [ 'toString' ], 1), Object.prototype.toString)
	t.equal(Object.keys(inherited), [ 'toString' ])

	const proto = { a: {} }
	t.equal(__set(proto, [ 'a', '__proto__' ], { x: 1 }), undefined)
	t.equal(Object.keys(proto.a), [ '__proto__' ])
	t.equal(Object.getPrototypeOf(proto.a), Object.prototype)
	t.equal(proto.a.x, undefined)
	t.equal({}.x, undefined)

	t.equal(__set(proto, [ 'a', '__proto__' ], { x: 2 }), { x: 1 })
	t.equal(__get(proto, [ 'a', '__proto__', 'x' ]), 2)

	t.equal(__set(proto, [ 'a', '__proto__', 'y' ], 3), undefined)
	t.equal(__get(proto, [ 'a', '__proto__' ]), { x: 2, y: 3 })
	t.equal({}.y, undefined)
})
