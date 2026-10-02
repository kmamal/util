const { test } = require('@kmamal/testing')
const { clone, cloneWith } = require('./clone')

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

test("object.cloneWith", (t) => {
	const fn = () => 1
	const keepFunctions = (x) => typeof x === 'function' ? x : undefined
	const src = { f: fn, a: [ fn, { g: fn } ], m: new Map([ [ fn, fn ] ]) }
	const res = cloneWith(src, keepFunctions)
	t.equal(res.f, fn)
	t.equal(res.a[0], fn)
	t.equal(res.a[1].g, fn)
	t.ok(res.a !== src.a)
	t.equal(res.m.get(fn), fn)

	const seen = []
	cloneWith({ a: 1, b: [ 2 ] }, (x) => { seen.push(x) })
	t.equal(seen, [ { a: 1, b: [ 2 ] }, 1, [ 2 ], 2 ])

	const marker = {}
	t.equal(cloneWith({ a: { b: 1 }, c: 2 }, (x) => x?.b === 1 ? marker : undefined).a, marker)
	t.equal(cloneWith(5, () => 6), 6)
	t.throws(() => cloneWith({ f: fn }, () => undefined))
})

test("object.clone more builtins", (t) => {
	const buffer = new ArrayBuffer(4)
	new Uint8Array(buffer).set([ 1, 2, 3, 4 ])
	const bufferClone = clone(buffer)
	t.ok(bufferClone instanceof ArrayBuffer && bufferClone !== buffer)
	t.equal(Array.from(new Uint8Array(bufferClone)), [ 1, 2, 3, 4 ])

	const resizable = new ArrayBuffer(2, { maxByteLength: 8 })
	const resizableClone = clone(resizable)
	t.ok(resizableClone.resizable)
	t.equal(resizableClone.maxByteLength, 8)

	const detached = new ArrayBuffer(2)
	detached.transfer()
	t.ok(clone(detached).detached)

	const shared = new SharedArrayBuffer(2)
	new Uint8Array(shared).set([ 5, 6 ])
	const sharedClone = clone(shared)
	t.ok(sharedClone instanceof SharedArrayBuffer && sharedClone !== shared)
	t.equal(Array.from(new Uint8Array(sharedClone)), [ 5, 6 ])

	const view = new DataView(buffer, 1, 2)
	const viewClone = clone(view)
	t.ok(viewClone instanceof DataView)
	t.equal([ viewClone.byteOffset, viewClone.byteLength, viewClone.getUint8(0) ], [ 1, 2, 2 ])

	t.equal(clone(Object(5)).valueOf(), 5)
	t.equal(clone(Object('ab')).valueOf(), 'ab')
	t.equal(clone(Object(false)).valueOf(), false)
	t.equal(clone(Object(5n)).valueOf(), 5n)
	const symbol = Symbol('s')
	t.equal(clone(Object(symbol)).valueOf(), symbol)
	t.ok(clone(Object(5)) instanceof Number)

	const error = new TypeError('bad', { cause: { code: 1 } })
	error.extra = { x: 1 }
	const errorClone = clone(error)
	t.ok(errorClone instanceof TypeError)
	t.equal(errorClone.message, 'bad')
	t.equal(errorClone.stack, error.stack)
	t.equal(errorClone.cause, { code: 1 })
	t.ok(errorClone.cause !== error.cause)
	t.equal(errorClone.extra, { x: 1 })
	t.equal(Object.keys(errorClone), [ 'extra' ])

	const aggregate = clone(new AggregateError([ new Error('a') ], 'many'))
	t.ok(aggregate instanceof AggregateError)
	t.equal(aggregate.errors.map((e) => e.message), [ 'a' ])

	const cyclic = new Error('loop')
	cyclic.cause = cyclic
	const cyclicClone = clone(cyclic)
	t.ok(cyclicClone.cause === cyclicClone)
})

test("object.clone typed arrays share cloned buffers", (t) => {
	const buffer = new ArrayBuffer(8)
	const a = new Uint8Array(buffer, 0, 4)
	const b = new Uint16Array(buffer, 4, 2)
	const res = clone({ a, b })
	t.ok(res.a.buffer === res.b.buffer)
	t.ok(res.a.buffer !== buffer)
	t.equal([ res.a.byteOffset, res.a.length, res.b.byteOffset, res.b.length ], [ 0, 4, 4, 2 ])
	res.a[0] = 9
	t.equal(a[0], 0)

	t.ok(clone(new Float64Array([ 1.5 ])) instanceof Float64Array)
	t.equal(Array.from(clone(new BigInt64Array([ 3n ]))), [ 3n ])
})

test("object.clone subclasses and extra props", (t) => {
	class MyMap extends Map {}

	class MyArray extends Array {}

	class MyBytes extends Uint8Array {}

	const map = new MyMap([ [ 1, { v: 1 } ] ])
	map.tag = 'x'
	const mapClone = clone(map)
	t.ok(mapClone instanceof MyMap)
	t.equal(mapClone.get(1), { v: 1 })
	t.equal(mapClone.tag, 'x')

	t.ok(clone(MyArray.from([ 1, 2 ])) instanceof MyArray)
	t.ok(clone(new MyBytes(2)) instanceof MyBytes)

	const date = new Date(5)
	date.label = 'd'
	t.equal(clone(date).label, 'd')
})

test("object.clone uncloneable", (t) => {
	t.throws(() => clone(new WeakMap()))
	t.throws(() => clone(new WeakSet()))
	t.throws(() => clone(new WeakRef({})))
	t.throws(() => clone(Promise.resolve()))
	t.throws(() => clone(new FinalizationRegistry(() => {})))
	t.throws(() => clone({ nested: [ new WeakMap() ] }))
})
