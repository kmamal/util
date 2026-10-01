const { testVariants, junkMap } = require('../testing/test-variants')
const { test } = require('@kmamal/testing')
const { __count, count, countBy } = require('./count')

testVariants("array.count", count, (t, f) => {
	t.equal(f([]), new Map())
	t.equal(f([ 1, 2, 3 ]), new Map([ [ 1, 1 ], [ 2, 1 ], [ 3, 1 ] ]))
	t.equal(f([ 1, 2, 3, 2, 1 ]), new Map([ [ 1, 2 ], [ 2, 2 ], [ 3, 1 ] ]))
}, { $$$: null, dst: junkMap })

testVariants("array.countBy", countBy, (t, f) => {
	t.equal(f([], (x) => x % 2), new Map())
	t.equal(f([ 1, 2, 3, 4, 5 ], (x) => x % 2), new Map([ [ 1, 3 ], [ 0, 2 ] ]))
}, { $$$: null, dst: junkMap })

test("map.__count", (t) => {
	const arr = [ 9, 1, 2, 1, 3, 9 ]
	const dst = new Map()
	t.equal(__count(dst, arr, 1, 5, (x) => x), undefined)
	t.equal(dst, new Map([ [ 1, 2 ], [ 2, 1 ], [ 3, 1 ] ]))
	t.equal(dst, count(arr.slice(1, 5)))
	t.equal(arr, [ 9, 1, 2, 1, 3, 9 ])

	const existing = new Map([ [ 1, 5 ], [ 'x', 7 ] ])
	__count(existing, arr, 1, 4, (x) => x)
	t.equal(existing, new Map([ [ 1, 7 ], [ 'x', 7 ], [ 2, 1 ] ]))

	const odd = new Map()
	__count(odd, [ 0, 1, 2, 3, 4, 5 ], 1, 4, (x) => x % 2)
	t.equal(odd, countBy([ 1, 2, 3 ], (x) => x % 2))

	const empty = new Map([ [ 'a', 1 ] ])
	__count(empty, arr, 3, 3, (x) => x)
	t.equal(empty, new Map([ [ 'a', 1 ] ]))

	const single = new Map()
	__count(single, arr, 2, 3, (x) => x)
	t.equal(single, new Map([ [ 2, 1 ] ]))

	const proto = new Map()
	__count(proto, [ '__proto__', 'constructor', '__proto__' ], 0, 3, (x) => x)
	t.equal(proto, new Map([ [ '__proto__', 2 ], [ 'constructor', 1 ] ]))
})
