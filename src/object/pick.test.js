const { testVariants, junkObject } = require('../testing/test-variants')
const { test } = require('@kmamal/testing')
const { __pick, pick, omit } = require('./pick')

testVariants('object.pick', pick, (t, f) => {
	t.equal(f({}, []), {})
	t.equal(f({}, [ 'a', 'b' ]), {})
	t.equal(f({ a: 1 }, [ 'a' ]), { a: 1 })
	t.equal(f({ a: 1 }, [ 'b' ]), {})
	t.equal(f({ a: 1, b: 2 }, [ 'a' ]), { a: 1 })
	t.equal(f({ a: 1, b: 2 }, [ 'b' ]), { b: 2 })
	t.equal(f({ a: 1, b: 2 }, [ 'a', 'b', 'c' ]), { a: 1, b: 2 })

	const res = f(JSON.parse('{"__proto__":{"x":1}}'), [ '__proto__' ])
	t.equal(Object.keys(res), [ '__proto__' ])
	t.equal(Object.getPrototypeOf(res), Object.prototype)
}, { dst: junkObject })

testVariants('object.omit', omit, (t, f) => {
	t.equal(f({}, []), {})
	t.equal(f({}, [ 'a', 'b' ]), {})
	t.equal(f({ a: 1 }, [ 'a' ]), {})
	t.equal(f({ a: 1 }, [ 'b' ]), { a: 1 })
	t.equal(f({ a: 1, b: 2 }, []), { a: 1, b: 2 })
	t.equal(f({ a: 1, b: 2 }, [ 'a' ]), { b: 2 })
	t.equal(f({ a: 1, b: 2 }, [ 'b' ]), { a: 1 })
	t.equal(f({ a: 1, b: 2 }, [ 'a', 'b', 'c' ]), {})
}, { dst: junkObject })

test("object.__pick", (t) => {
	const src = { a: 1, b: 2, c: 3 }
	const dst = { a: 0, x: 9 }
	t.equal(__pick(dst, src, [ 'a', 'c', 'd' ]), undefined)
	t.equal(dst, { a: 1, x: 9, c: 3 })
	t.equal(src, { a: 1, b: 2, c: 3 })

	const fresh = {}
	__pick(fresh, src, [ 'b', 'c' ])
	t.equal(fresh, pick(src, [ 'b', 'c' ]))

	const empty = { x: 1 }
	__pick(empty, src, [])
	t.equal(empty, { x: 1 })

	const inheriting = Object.create({ inherited: 1 })
	inheriting.own = 2
	const fromInheriting = {}
	__pick(fromInheriting, inheriting, [ 'own', 'inherited', 'toString', '__proto__' ])
	t.equal(fromInheriting, { own: 2 })
	t.equal(Object.keys(fromInheriting), [ 'own' ])

	const proto = { y: 1 }
	__pick(proto, JSON.parse('{"__proto__":{"x":1},"z":2}'), [ '__proto__' ])
	t.equal(Object.keys(proto), [ 'y', '__proto__' ])
	t.equal(Object.getPrototypeOf(proto), Object.prototype)
	t.equal(proto.x, undefined)
	t.equal(Object.getOwnPropertyDescriptor(proto, '__proto__').value, { x: 1 })
})
