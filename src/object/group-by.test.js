const { testVariants, junkObject } = require('../testing/test-variants')
const { test } = require('@kmamal/testing')
const { isEqual } = require('./is-equal')
const { __groupBy, groupBy } = require('./group-by')

const getA = (x) => x.a

testVariants("array.groupBy", groupBy, (t, f) => {
	t.equal(f([], getA), {})
	t.equal(f([ { a: 1 } ], getA), { 1: [ { a: 1 } ] })
	t.equal(
		f([ { a: 1 }, { a: 2 } ], getA),
		{
			1: [ { a: 1 } ],
			2: [ { a: 2 } ],
		},
	)
	t.equal(
		f([ { a: 1, b: 3 }, { a: 1, b: 5 }, { a: 2, b: 1 }, { a: 2, b: 7 } ], getA),
		{
			1: [ { a: 1, b: 3 }, { a: 1, b: 5 } ],
			2: [ { a: 2, b: 1 }, { a: 2, b: 7 } ],
		},
	)
	t.equal(f([ 'constructor' ], (x) => x).constructor, [ 'constructor' ])
}, { $$$: null, dst: junkObject })

test("object.__groupBy", (t) => {
	const arr = [ { a: 9 }, { a: 1, b: 1 }, { a: 2 }, { a: 1, b: 2 }, { a: 9 } ]
	const dst = Object.create(null)
	t.equal(__groupBy(dst, arr, 1, 4, getA), dst)
	t.ok(isEqual(dst, { 1: [ { a: 1, b: 1 }, { a: 1, b: 2 } ], 2: [ { a: 2 } ] }))
	t.ok(isEqual(dst, groupBy(arr.slice(1, 4), getA)))
	t.equal(dst[1][0], arr[1])

	const list = [ 'x' ]
	const existing = { 1: list }
	__groupBy(existing, arr, 1, 3, getA)
	t.equal(existing[1], list)
	t.equal(existing, { 1: [ 'x', { a: 1, b: 1 } ], 2: [ { a: 2 } ] })

	const empty = {}
	__groupBy(empty, arr, 2, 2, getA)
	t.equal(empty, {})

	const single = {}
	__groupBy(single, arr, 4, 5, getA)
	t.equal(single, { 9: [ { a: 9 } ] })

	const inherited = {}
	__groupBy(inherited, [ 'toString', 'constructor' ], 0, 2, (x) => x)
	t.equal(Object.keys(inherited), [ 'toString', 'constructor' ])
	t.equal(inherited.toString, [ 'toString' ])

	const proto = {}
	__groupBy(proto, [ 1, 2, 3 ], 0, 2, () => '__proto__')
	t.equal(Object.keys(proto), [ '__proto__' ])
	t.equal(Object.getPrototypeOf(proto), Object.prototype)
	t.equal(Object.getOwnPropertyDescriptor(proto, '__proto__').value, [ 1, 2 ])
})
