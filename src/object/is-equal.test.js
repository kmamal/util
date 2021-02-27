const { test } = require('@xyz/testing')
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
	t.ok(isEqual({ foo: 42 }, { foo: 42, bar: undefined }))
	t.ok(!isEqual({ foo: 42 }, { bar: 69 }))
	t.ok(!isEqual({ foo: 42 }, { foo: 42, bar: 69 }))
	t.ok(!isEqual({ foo: 42, bar: 69 }, { foo: 42 }))
	t.ok(!isEqual({ foo: 42 }, { foo: 5 }))
	t.ok(!isEqual(null, {}))

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
