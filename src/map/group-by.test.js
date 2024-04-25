const { test } = require('@kmamal/testing')
const { groupBy } = require('./group-by')

const getA = (x) => x.a

test("array.groupBy", (t) => {
	t.equal(groupBy([], getA), new Map())
	t.equal(groupBy([ { a: 1 } ], getA), new Map([ [ 1, [ { a: 1 } ] ] ]))
	t.equal(
		groupBy([ { a: 1 }, { a: 2 } ], getA),
		new Map([ [ 1, [ { a: 1 } ] ], [ 2, [ { a: 2 } ] ] ]),
	)
	t.equal(
		groupBy([ { a: 1, b: 3 }, { a: 1, b: 5 }, { a: 2, b: 1 }, { a: 2, b: 7 } ], getA),
		new Map([
			[ 1, [ { a: 1, b: 3 }, { a: 1, b: 5 } ] ],
			[ 2, [ { a: 2, b: 1 }, { a: 2, b: 7 } ] ],
		]),
	)
})
