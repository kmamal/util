const { test } = require('@kmamal/testing')
const { isEqual } = require('./is-equal')

test("object.isEqual", (t) => {
	t.ok(isEqual(null, null))
	t.ok(isEqual(undefined, undefined))
	t.ok(!isEqual(null, undefined))

	t.ok(isEqual(true, true))
	t.ok(isEqual(false, false))
	t.ok(!isEqual(true, false))
	t.ok(!isEqual(0, false))
	t.ok(!isEqual('', false))
	t.ok(!isEqual(null, false))

	t.ok(isEqual(0, 0))
	t.ok(isEqual(10, 10))
	t.ok(isEqual(Number.MAX_VALUE, Number.MAX_VALUE))
	t.ok(isEqual(Infinity, Infinity))
	t.ok(isEqual(NaN, NaN))
	t.ok(isEqual(0, -0))
	t.ok(!isEqual(0, 5))
	t.ok(!isEqual(0, Infinity))
	t.ok(!isEqual(0, NaN))

	t.ok(isEqual('', ''))
	t.ok(isEqual('a', 'a'))
	t.ok(isEqual('foo\nbar', 'foo\nbar'))
	t.ok(!isEqual('', 'a'))
	t.ok(!isEqual('foo', 'bar'))
	t.ok(!isEqual(10, '10'))

	t.ok(isEqual(BigInt(10), BigInt(10)))
	t.ok(!isEqual(BigInt(10), BigInt(20)))
	t.ok(!isEqual(10, BigInt(10)))

	t.ok(isEqual(Symbol.for('foo'), Symbol.for('foo')))
	t.ok(isEqual(Symbol.for('bar'), Symbol.for('bar')))
	t.ok(!isEqual(Symbol.for('foo'), Symbol.for('bar')))
	t.ok(!isEqual(Symbol('foo'), Symbol('foo')))
	t.ok(!isEqual('foo', Symbol('foo')))

	const a = () => null
	t.ok(isEqual(a, a))
	t.ok(!isEqual(() => null, () => null))

	t.ok(isEqual([], []))
	t.ok(isEqual([ 1, 2, 3 ], [ 1, 2, 3 ]))
	t.ok(!isEqual([ 1, 2, 3 ], [ 1, 2 ]))
	t.ok(!isEqual([ 1, 2, 3 ], [ 3, 2, 1 ]))
	t.ok(!isEqual('', []))
	t.ok(!isEqual({}, []))

	t.ok(isEqual({}, {}))
	t.ok(isEqual({ foo: 42 }, { foo: 42 }))
	t.ok(isEqual({ foo: 42, bar: 69 }, { foo: 42, bar: 69 }))
	t.ok(isEqual({ foo: 42, bar: 69 }, { bar: 69, foo: 42 }))
	t.ok(!isEqual({ foo: 42 }, { bar: 69 }))
	t.ok(!isEqual({ foo: 42 }, { foo: 42, bar: 69 }))
	t.ok(!isEqual({ foo: 42, bar: 69 }, { foo: 42 }))
	t.ok(!isEqual({ foo: 42 }, { foo: 42, bar: undefined }))
	t.ok(!isEqual({ foo: 42 }, { foo: 5 }))
	t.ok(!isEqual(null, {}))

	t.ok(isEqual(new Set(), new Set()))
	t.ok(isEqual(new Map(), new Map()))
	t.ok(!isEqual(new Map(), new Set()))
	t.ok(isEqual(
		new Set([ 1, 2, 3, 4 ]),
		new Set([ 1, 2, 3, 4 ]),
	))
	t.ok(!isEqual(
		new Set([ 1, 2, 3 ]),
		new Set([ 1, 2, 3, 4 ]),
	))
	t.ok(!isEqual(
		new Set([ 1, 2, 3, 4 ]),
		new Set([ 1, 2, 3 ]),
	))
	t.ok(isEqual(
		new Map([ [ 1, 2 ], [ 3, 4 ] ]),
		new Map([ [ 1, 2 ], [ 3, 4 ] ]),
	))
	t.ok(!isEqual(
		new Map([ [ 1, 2 ], [ 3, 5 ] ]),
		new Map([ [ 1, 2 ], [ 3, 4 ] ]),
	))
	t.ok(!isEqual(
		new Map([ [ 1, 2 ], [ 3, 4 ] ]),
		new Map([ [ 1, 2 ], [ 3, 5 ] ]),
	))
	t.ok(!isEqual(
		new Map([ [ 1, 2 ] ]),
		new Map([ [ 1, 2 ], [ 3, 4 ] ]),
	))
	t.ok(!isEqual(
		new Map([ [ 1, 2 ], [ 3, 4 ] ]),
		new Map([ [ 1, 2 ] ]),
	))
	t.ok(isEqual(
		new Set([ { a: 1 }, { b: 2 } ]),
		new Set([ { a: 1 }, { b: 2 } ]),
	))
	t.ok(!isEqual(
		new Set([ { a: 1 }, { b: 3 } ]),
		new Set([ { a: 1 }, { b: 2 } ]),
	))
	t.ok(!isEqual(
		new Set([ { a: 1 }, { b: 2 } ]),
		new Set([ { a: 1 }, { b: 3 } ]),
	))
	t.ok(!isEqual(
		new Set([ { a: 1 } ]),
		new Set([ { a: 1 }, { b: 2 } ]),
	))
	t.ok(!isEqual(
		new Set([ { a: 1 }, { b: 2 } ]),
		new Set([ { a: 1 } ]),
	))
	t.ok(isEqual(
		new Map([ [ { a: 1 }, { b: 2 } ] ]),
		new Map([ [ { a: 1 }, { b: 2 } ] ]),
	))
	t.ok(!isEqual(
		new Map([ [ { a: 1 }, { b: 3 } ] ]),
		new Map([ [ { a: 1 }, { b: 2 } ] ]),
	))
	t.ok(!isEqual(
		new Map([ [ { a: 1 }, { b: 2 } ] ]),
		new Map([ [ { a: 1 }, { b: 3 } ] ]),
	))
	t.ok(!isEqual(
		new Map([ [ { a: 1 } ] ]),
		new Map([ [ { a: 1 }, { b: 2 } ] ]),
	))
	t.ok(!isEqual(
		new Map([ [ { a: 1 }, { b: 2 } ] ]),
		new Map([ [ { a: 1 } ] ]),
	))

	t.ok(isEqual(
		{
			a: [
				{
					c: Symbol.for('foo'),
				},
			],
			b: {
				c: [ 'a', null, NaN, 42 ],
			},
		},
		{
			a: [
				{
					c: Symbol.for('foo'),
				},
			],
			b: {
				c: [ 'a', null, NaN, 42 ],
			},
		},
	))

	t.ok(!isEqual(
		{
			a: [
				{
					c: Symbol.for('foo'),
				},
			],
			b: {
				c: [ 'a', null, NaN, 42 ],
			},
		},
		{
			a: [
				{
					c: Symbol.for('foo'),
				},
			],
			b: {
				c: [ 'a', null, NaN, 69 ],
			},
		},
	))
})

test("object.isEqual builtins", (t) => {
	t.ok(isEqual(new Date(0), new Date(0)))
	t.ok(!isEqual(new Date(0), new Date(1000)))
	t.ok(isEqual(new Date(NaN), new Date(NaN)))
	t.ok(!isEqual(new Date(0), {}))
	t.ok(isEqual(/a/gu, /a/gu))
	t.ok(!isEqual(/a/u, /b/u))
	t.ok(!isEqual(/a/u, /a/gu))
	t.ok(isEqual(Object(1), Object(1)))
	t.ok(!isEqual(Object(1), Object(2)))
	t.ok(!isEqual(Object('a'), Object('b')))
	t.ok(!isEqual(Object(true), Object(false)))
	t.ok(isEqual(Object.create(null), {}))
})

test("object.isEqual prototypes", (t) => {
	class A { constructor () { this.x = 1 } }

	class B { constructor () { this.x = 1 } }

	t.ok(isEqual(new A(), new A()))
	t.ok(!isEqual(new A(), { x: 1 }))
	t.ok(!isEqual(new A(), new B()))
})

test("object.isEqual map key order", (t) => {
	t.ok(isEqual(
		new Map([ [ { x: 1 }, 1 ], [ { x: 1 }, 2 ] ]),
		new Map([ [ { x: 1 }, 2 ], [ { x: 1 }, 1 ] ]),
	))
	t.ok(!isEqual(
		new Map([ [ { x: 1 }, 1 ], [ { x: 1 }, 2 ] ]),
		new Map([ [ { x: 1 }, 2 ], [ { x: 1 }, 2 ] ]),
	))
})

test("object.isEqual cycles", (t) => {
	const a = {}
	a.a = a
	const b = {}
	b.a = b
	t.ok(isEqual(a, b))

	const c = { v: 1 }
	c.a = c
	const d = { v: 2 }
	d.a = d
	t.ok(!isEqual(c, d))

	const e = [ 1 ]
	e.push(e)
	const f = [ 1 ]
	f.push(f)
	t.ok(isEqual(e, f))
})

test("object.isEqual symbols", (t) => {
	const s = Symbol('s')
	const r = Symbol('r')
	t.ok(isEqual({ a: 1, [s]: { b: 2 } }, { a: 1, [s]: { b: 2 } }))
	t.ok(!isEqual({ a: 1, [s]: 2 }, { a: 1, [s]: 3 }))
	t.ok(!isEqual({ a: 1, [s]: 2 }, { a: 1 }))
	t.ok(!isEqual({ a: 1, [s]: 2 }, { a: 1, [r]: 2 }))

	const hidden = {}
	Object.defineProperty(hidden, s, { value: 1, enumerable: false })
	t.ok(isEqual(hidden, {}))
})

test("object.isEqual more builtins", (t) => {
	const bytes = (...values) => new Uint8Array(values).buffer

	t.ok(isEqual(bytes(1, 2), bytes(1, 2)))
	t.ok(!isEqual(bytes(1, 2), bytes(1, 3)))
	t.ok(!isEqual(bytes(1, 2), bytes(1, 2, 3)))

	const detached = new ArrayBuffer(2)
	detached.transfer()
	t.ok(!isEqual(detached, new ArrayBuffer(0)))

	t.ok(isEqual(new DataView(bytes(0, 1, 2), 1), new DataView(bytes(9, 1, 2), 1)))
	t.ok(!isEqual(new DataView(bytes(1, 2)), new DataView(bytes(1, 3))))
	t.ok(!isEqual(new DataView(new ArrayBuffer(2)), new DataView(new ArrayBuffer(4))))

	t.ok(isEqual(new Float64Array([ 1, NaN ]), new Float64Array([ 1, NaN ])))
	t.ok(!isEqual(new Float64Array([ 1 ]), new Float64Array([ 2 ])))
	t.ok(!isEqual(new Float64Array([ 1 ]), new Float32Array([ 1 ])))

	t.ok(isEqual(Object(5), Object(5)))
	t.ok(!isEqual(Object(5), Object(6)))
	t.ok(!isEqual(Object(5), Object('5')))
	t.ok(isEqual(Object('ab'), Object('ab')))
	t.ok(!isEqual(Object(true), Object(false)))
	t.ok(isEqual(Object(1n), Object(1n)))

	t.ok(isEqual(new Error('a'), new Error('a')))
	t.ok(!isEqual(new Error('a'), new Error('b')))
	t.ok(!isEqual(new Error('a'), new TypeError('a')))
	t.ok(isEqual(new Error('a', { cause: { c: 1 } }), new Error('a', { cause: { c: 1 } })))
	t.ok(!isEqual(new Error('a', { cause: 1 }), new Error('a')))
	t.ok(!isEqual(new AggregateError([ 1 ], 'a'), new AggregateError([ 2 ], 'a')))

	const weak = new WeakMap()
	t.ok(isEqual(weak, weak))
	t.ok(!isEqual(new WeakMap(), new WeakMap()))
	t.ok(!isEqual(Promise.resolve(1), Promise.resolve(1)))

	const tagged = new Map()
	tagged.tag = 1
	t.ok(!isEqual(tagged, new Map()))
})

test("object.isEqual clone round-trip", (t) => {
	const { clone } = require('./clone')
	const buffer = new ArrayBuffer(8)
	const value = {
		map: new Map([ [ 1, new Set([ 2 ]) ] ]),
		date: new Date(5),
		regexp: /a/gu,
		buffer,
		view: new DataView(buffer, 2, 4),
		bytes: new Uint8Array(buffer, 0, 2),
		number: Object(5),
		string: Object('ab'),
		error: new RangeError('r', { cause: [ 1 ] }),
		array: [ 1, { a: 2 } ],
	}
	t.ok(isEqual(value, clone(value)))
})
