const { testVariants, junkObject } = require('../testing/test-variants')
const { test } = require('@kmamal/testing')
const { isEqual } = require('./is-equal')
const { __count, count, countBy } = require('./count')

testVariants("array.count", count, (t, f) => {
	t.equal(f([]), {})
	t.equal(f([ 1, 2, 3 ]), { 1: 1, 2: 1, 3: 1 })
	t.equal(f([ 1, 2, 3, 2, 1 ]), { 1: 2, 2: 2, 3: 1 })
	t.equal(f([ 'toString', 'toString' ]).toString, 2)
	t.equal(f([ 'constructor' ]).constructor, 1)
}, { $$$: null, dst: junkObject })

testVariants("array.countBy", countBy, (t, f) => {
	t.equal(f([], (x) => x % 2), {})
	t.equal(f([ 1, 2, 3, 4, 5 ], (x) => x % 2), { 0: 2, 1: 3 })
	t.equal(f([ 'a', 'b' ], () => 'toString').toString, 2)
}, { $$$: null, dst: junkObject })

test("object.__count", (t) => {
	const arr = [ 9, 1, 2, 1, 3, 9 ]
	const dst = Object.create(null)
	t.equal(__count(dst, arr, 1, 5, (x) => x), undefined)
	t.ok(isEqual(dst, { 1: 2, 2: 1, 3: 1 }))
	t.ok(isEqual(dst, count(arr.slice(1, 5))))
	t.equal(arr, [ 9, 1, 2, 1, 3, 9 ])

	const existing = { 1: 5, x: 7 }
	__count(existing, arr, 1, 4, (x) => x)
	t.equal(existing, { 1: 7, 2: 1, x: 7 })

	const odd = Object.create(null)
	__count(odd, [ 0, 1, 2, 3, 4, 5 ], 1, 4, (x) => x % 2)
	t.ok(isEqual(odd, countBy([ 1, 2, 3 ], (x) => x % 2)))

	const empty = { a: 1 }
	__count(empty, arr, 3, 3, (x) => x)
	t.equal(empty, { a: 1 })

	const single = {}
	__count(single, arr, 2, 3, (x) => x)
	t.equal(single, { 2: 1 })

	const inherited = {}
	__count(inherited, [ 'toString', 'constructor', 'toString' ], 0, 3, (x) => x)
	t.equal(Object.keys(inherited), [ 'toString', 'constructor' ])
	t.equal(inherited.toString, 2)
	t.equal(inherited.constructor, 1)

	const proto = {}
	__count(proto, [ 'a', '__proto__', '__proto__', 'a' ], 1, 3, (x) => x)
	t.equal(Object.keys(proto), [ '__proto__' ])
	t.ok(Object.hasOwn(proto, '__proto__'))
	t.equal(Object.getPrototypeOf(proto), Object.prototype)
	t.equal(Object.getOwnPropertyDescriptor(proto, '__proto__').value, 2)
})
