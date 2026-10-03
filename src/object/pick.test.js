const { testVariants, junkObject } = require('../testing/test-variants')
const { test } = require('@kmamal/testing')
const { __pick, pick, omit } = require('./pick')

const s = Symbol('s')
const hidden = Symbol('hidden')

const withSymbols = () => {
	const obj = { a: 1, b: 2, [s]: 3 }
	Object.defineProperty(obj, hidden, { value: 4, enumerable: false })
	return obj
}

testVariants('object.pick', pick, (t, f) => {
	t.equal(f({}, []), {})
	t.equal(f({}, [ 'a', 'b' ]), {})
	t.equal(f({ a: 1 }, [ 'a' ]), { a: 1 })
	t.equal(f({ a: 1 }, [ 'b' ]), {})
	t.equal(f({ a: 1, b: 2 }, [ 'a' ]), { a: 1 })
	t.equal(f({ a: 1, b: 2 }, [ 'b' ]), { b: 2 })
	t.equal(f({ a: 1, b: 2 }, [ 'a', 'b', 'c' ]), { a: 1, b: 2 })
	t.equal(f({ 2: 1, 10: 2, 3: 3 }, [ 10, 3 ]), { 3: 3, 10: 2 })
	t.equal(f({ 9: 1, 10: 2, a: 3, b: 4 }, [ 10, 'a' ]), { 10: 2, a: 3 })

	const picked = f(withSymbols(), [ s, 'a' ])
	t.equal(Object.keys(picked), [ 'a' ])
	t.equal(picked[s], 3)

	const unpicked = f(withSymbols(), [ 'a' ])
	t.equal(Object.keys(unpicked), [ 'a' ])
	t.equal(Object.getOwnPropertySymbols(unpicked).filter((x) => x === s), [])

	const res = f(JSON.parse('{"__proto__":{"x":1}}'), [ '__proto__' ])
	t.equal(Object.keys(res), [ '__proto__' ])
	t.equal(Object.getPrototypeOf(res), Object.prototype)

	t.equal(f(withSymbols(), [ hidden ]), {})
	t.equal(f(Object.defineProperty({}, 'x', { value: 1, enumerable: false }), [ 'x' ]), {})
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
	t.equal(f({ 2: 1, 10: 2, 3: 3 }, [ 10, 3 ]), { 2: 1 })
	t.equal(f({ 9: 1, 10: 2, a: 3, b: 4 }, [ 10, 'a' ]), { 9: 1, b: 4 })
	t.equal(f({ a: 1, b: 2 }, [ Symbol('other'), 'a' ]), { b: 2 })

	const omitted = f(withSymbols(), [ s, 'a' ])
	t.equal(Object.keys(omitted), [ 'b' ])
	t.equal(Object.getOwnPropertySymbols(omitted).filter((x) => x === s), [])

	const unomitted = f(withSymbols(), [ 'a' ])
	t.equal(Object.keys(unomitted), [ 'b' ])
	t.equal(unomitted[s], 3)

	const res = f(JSON.parse('{"__proto__":{"x":1},"a":1}'), [ 'a' ])
	t.equal(Object.keys(res), [ '__proto__' ])
	t.equal(Object.getPrototypeOf(res), Object.prototype)
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
