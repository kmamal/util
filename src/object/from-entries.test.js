const { testVariants, junkObject } = require('../testing/test-variants')
const { test } = require('@kmamal/testing')
const { __fromEntries, fromEntries } = require('./from-entries')

testVariants("object.from-entries", fromEntries, (t, f) => {
	t.equal(f([]), {})
	t.equal(f([ [ 'a', 1 ] ]), { a: 1 })
	t.equal(f([ [ 'a', 1 ], [ 'b', 2 ] ]), { a: 1, b: 2 })

	const res = f([ [ '__proto__', { x: 1 } ] ])
	t.equal(Object.keys(res), [ '__proto__' ])
	t.equal(Object.getPrototypeOf(res), Object.prototype)
}, { $$$: null, dst: junkObject })

test("object.__fromEntries", (t) => {
	const dst = { a: 0, x: 9 }
	t.equal(__fromEntries(dst, [ [ 'a', 1 ], [ 'b', 2 ], [ 'a', 3 ] ]), undefined)
	t.equal(dst, { a: 3, x: 9, b: 2 })

	const empty = { x: 1 }
	__fromEntries(empty, [])
	t.equal(empty, { x: 1 })

	const fresh = {}
	__fromEntries(fresh, [ [ 'a', 1 ], [ 'b', 2 ] ])
	t.equal(fresh, fromEntries([ [ 'a', 1 ], [ 'b', 2 ] ]))

	const inherited = {}
	__fromEntries(inherited, [ [ 'toString', 1 ] ])
	t.equal(Object.keys(inherited), [ 'toString' ])
	t.equal(inherited.toString, 1)

	const proto = { y: 1 }
	__fromEntries(proto, [ [ '__proto__', { x: 1 } ] ])
	t.equal(Object.keys(proto), [ 'y', '__proto__' ])
	t.equal(Object.getPrototypeOf(proto), Object.prototype)
	t.equal(proto.x, undefined)
})
