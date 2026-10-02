const { test } = require('@kmamal/testing')
const { clone } = require('./clone')

test("object.clone", (t) => {
	t.equal(undefined, clone(undefined))
	t.equal(null, clone(null))
	t.equal(false, clone(false))
	t.equal(0, clone(0))
	t.equal(-1, clone(-1))
	t.equal(NaN, clone(NaN))
	t.equal(Infinity, clone(Infinity))
	t.equal("foo", clone("foo"))
	t.equal(Symbol.for('foo'), clone(Symbol.for('foo')))
	t.equal([], clone([]))
	t.equal([ 1, 2, 3 ], clone([ 1, 2, 3 ]))
	t.equal({ a: 1, b: 2 }, clone({ a: 1, b: 2 }))
	t.equal(new Set(), clone(new Set()))
	t.equal(new Set([ 1, 2, 3 ]), clone(new Set([ 1, 2, 3 ])))
	t.equal(new Map(), clone(new Map()))
	t.equal(new Map([ [ 1, 2 ] ]), clone(new Map([ [ 1, 2 ] ])))

	const obj = {
		a: 5,
		b: "Hello, World!",
		c: [
			new Map([
				[ { foo: 42 }, 6 ],
				[ "bar", { baz: "baz" } ],
				[ false, null ],
			]),
			new Set([ 1, 2, 3, 4, 5 ]),
		],
	}
	t.equal(obj, clone(obj))
})

test("object.clone references", (t) => {
	const obj = { a: { b: [ 1 ] }, m: new Map(), s: new Set() }
	const res = clone(obj)
	t.ok(res !== obj)
	t.ok(res.a !== obj.a)
	t.ok(res.a.b !== obj.a.b)
	t.ok(res.m !== obj.m)
	t.ok(res.s !== obj.s)
})

test("object.clone cycles", (t) => {
	const obj = { a: [] }
	obj.self = obj
	obj.a.push(obj)
	const res = clone(obj)
	t.ok(res !== obj)
	t.ok(res.self === res)
	t.ok(res.a[0] === res)
})

test("object.clone cache after error", (t) => {
	const shared = { v: 1 }
	try {
		clone({ a: shared, f () {} })
	}
	catch (_) {}
	shared.v = 2
	t.equal(clone(shared).v, 2)
})

test("object.clone builtins", (t) => {
	const date = clone({ d: new Date(5) }).d
	t.ok(date instanceof Date)
	t.equal(date.getTime(), 5)

	const regexp = clone(/a/gu)
	t.ok(regexp instanceof RegExp)
	t.equal(regexp.source, 'a')
	t.equal(regexp.flags, 'gu')

	const bytes = new Uint8Array([ 1, 2 ])
	const bytesClone = clone(bytes)
	t.ok(bytesClone instanceof Uint8Array && bytesClone !== bytes)
	t.equal(Array.from(bytesClone), [ 1, 2 ])

	class A { constructor () { this.x = { y: 1 } } }

	const a = new A()
	const aClone = clone(a)
	t.ok(aClone instanceof A)
	t.ok(aClone.x !== a.x)
	t.equal(aClone.x.y, 1)
})

test("object.clone __proto__", (t) => {
	const res = clone(JSON.parse('{"__proto__":{"x":1}}'))
	t.equal(Object.keys(res), [ '__proto__' ])
	t.equal(Object.getPrototypeOf(res), Object.prototype)
})

test("object.clone symbols", (t) => {
	const s = Symbol('s')
	const hidden = Symbol('hidden')
	const src = { a: 1, [s]: { b: 2 } }
	Object.defineProperty(src, hidden, { value: 3, enumerable: false })
	const res = clone(src)
	t.equal(Reflect.ownKeys(res), [ 'a', s ])
	t.equal(res[s], { b: 2 })
	t.ok(res[s] !== src[s])
})
