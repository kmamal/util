const { testVariants, junkMap } = require('../testing/test-variants')
const { test } = require('@kmamal/testing')
const { __groupBy, groupBy } = require('./group-by')

const getA = (x) => x.a

testVariants("array.groupBy", groupBy, (t, f) => {
	t.equal(f([], getA), new Map())
	t.equal(f([ { a: 1 } ], getA), new Map([ [ 1, [ { a: 1 } ] ] ]))
	t.equal(
		f([ { a: 1 }, { a: 2 } ], getA),
		new Map([ [ 1, [ { a: 1 } ] ], [ 2, [ { a: 2 } ] ] ]),
	)
	t.equal(
		f([ { a: 1, b: 3 }, { a: 1, b: 5 }, { a: 2, b: 1 }, { a: 2, b: 7 } ], getA),
		new Map([
			[ 1, [ { a: 1, b: 3 }, { a: 1, b: 5 } ] ],
			[ 2, [ { a: 2, b: 1 }, { a: 2, b: 7 } ] ],
		]),
	)
}, { $$$: null, dst: junkMap })

test("map.__groupBy", (t) => {
	const arr = [ { a: 9 }, { a: 1, b: 1 }, { a: 2 }, { a: 1, b: 2 }, { a: 9 } ]
	const dst = new Map()
	t.equal(__groupBy(dst, arr, 1, 4, getA), dst)
	t.equal(dst, new Map([ [ 1, [ { a: 1, b: 1 }, { a: 1, b: 2 } ] ], [ 2, [ { a: 2 } ] ] ]))
	t.equal(dst, groupBy(arr.slice(1, 4), getA))
	t.equal(dst.get(1)[0], arr[1])

	const list = [ 'x' ]
	const existing = new Map([ [ 1, list ] ])
	__groupBy(existing, arr, 1, 3, getA)
	t.equal(existing.get(1), list)
	t.equal(existing, new Map([ [ 1, [ 'x', { a: 1, b: 1 } ] ], [ 2, [ { a: 2 } ] ] ]))

	const empty = new Map()
	__groupBy(empty, arr, 2, 2, getA)
	t.equal(empty, new Map())

	const single = new Map()
	__groupBy(single, arr, 4, 5, getA)
	t.equal(single, new Map([ [ 9, [ { a: 9 } ] ] ]))
})
