const { testVariants, junkObject } = require('../testing/test-variants')
const { test } = require('@kmamal/testing')
const { __zip, zip } = require('./zip')

testVariants("object.zip", zip, (t, f) => {
	t.equal(f([], []), {})
	t.equal(f([ 'a' ], [ 1 ]), { a: 1 })
	t.equal(f([ 'a', 'b' ], [ 1, 2 ]), { a: 1, b: 2 })

	const res = f([ '__proto__' ], [ { x: 1 } ])
	t.equal(Object.keys(res), [ '__proto__' ])
	t.equal(Object.getPrototypeOf(res), Object.prototype)
}, { $$$: null, dst: junkObject })

test("object.__zip", (t) => {
	const dst = { a: 0, x: 9 }
	t.equal(__zip(dst, [ 'a', 'b' ], [ 1, 2 ]), undefined)
	t.equal(dst, { a: 1, x: 9, b: 2 })

	const fresh = {}
	__zip(fresh, [ 'a', 'b' ], [ 1, 2 ])
	t.equal(fresh, zip([ 'a', 'b' ], [ 1, 2 ]))

	const empty = { x: 1 }
	__zip(empty, [], [ 1, 2 ])
	t.equal(empty, { x: 1 })

	const shortKeys = {}
	__zip(shortKeys, [ 'a' ], [ 1, 2, 3 ])
	t.equal(shortKeys, { a: 1 })

	const shortValues = {}
	__zip(shortValues, [ 'a', 'b' ], [ 1 ])
	t.equal(Object.keys(shortValues), [ 'a', 'b' ])
	t.equal(shortValues.b, undefined)

	const inherited = {}
	__zip(inherited, [ 'toString' ], [ 1 ])
	t.equal(Object.keys(inherited), [ 'toString' ])
	t.equal(inherited.toString, 1)

	const proto = { y: 1 }
	__zip(proto, [ '__proto__' ], [ { x: 1 } ])
	t.equal(Object.keys(proto), [ 'y', '__proto__' ])
	t.equal(Object.getPrototypeOf(proto), Object.prototype)
	t.equal(proto.x, undefined)
})
