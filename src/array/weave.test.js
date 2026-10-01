const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __weave, __weaveTwo, weave, weaveTwo } = require('./weave')
const { unweave } = require('./unweave')

testVariants("array.weave", weave, (t, f) => {
	t.equal(f([]), [])
	t.equal(f([ [] ]), [])
	t.equal(f([ [ 1, 2 ] ]), [ 1, 2 ])
	t.equal(f([ [], [] ]), [])
	t.equal(f([ [], [ 1 ] ]), [ 1 ])
	t.equal(f([ [ 1 ], [] ]), [ 1 ])
	t.equal(f([ [ 1 ], [ 2 ] ]), [ 1, 2 ])
	t.equal(f([ [ 1 ], [ 2 ], [ 3 ] ]), [ 1, 2, 3 ])
	t.equal(f([ [ 1, 3, 5 ], [ 2, 4 ] ]), [ 1, 2, 3, 4, 5 ])
	t.equal(f([ [ 1, 3, 5, 6, 7 ], [ 2, 4 ] ]), [ 1, 2, 3, 4, 5, 6, 7 ])
	t.equal(f([ [ 1, 3 ], [ 2, 4, 5, 6, 7 ] ]), [ 1, 2, 3, 4, 5, 6, 7 ])
	t.equal(f([ [ 1, 4 ], [ 2 ], [ 3 ] ]), [ 1, 2, 3, 4 ])
	t.equal(f([ [ 1, 4 ], [ 2, 5 ], [ 3 ] ]), [ 1, 2, 3, 4, 5 ])
	t.equal(f([ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]), [ 1, 2, 3, 4, 5, 6 ])
	t.equal(
		f([ [ 1, 4 ], [ 2, 5, 7, 9 ], [ 3, 6, 8 ] ]),
		[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
	)
	t.equal(f([ [ 1, 2 ], [], [ 3, 4 ] ]), [ 1, 3, 2, 4 ])
	t.equal(f([ [], [ 1 ], [ 2 ] ]), [ 1, 2 ])
	t.equal(f([ [ 1 ], [], [ 2 ], [], [ 3, 4, 5 ] ]), [ 1, 2, 3, 4, 5 ])
	t.equal(f(unweave([ 1, 2 ], 3)), [ 1, 2 ])
})

testVariants("array.weaveTwo", weaveTwo, (t, f) => {
	t.equal(f([], []), [])
	t.equal(f([ 1, 2 ], []), [ 1, 2 ])
	t.equal(f([], [ 1, 2 ]), [ 1, 2 ])
	t.equal(f([ 1 ], [ 2 ]), [ 1, 2 ])
	t.equal(f([ 1, 3, 5 ], [ 2, 4 ]), [ 1, 2, 3, 4, 5 ])
	t.equal(f([ 1, 3, 5, 6, 7 ], [ 2, 4 ]), [ 1, 2, 3, 4, 5, 6, 7 ])
	t.equal(f([ 1, 3 ], [ 2, 4, 5, 6, 7 ]), [ 1, 2, 3, 4, 5, 6, 7 ])
})

test("array.__weave return value", (t) => {
	t.equal(__weave([], 10, [ [ 1 ], [ 2 ], [ 3, 4, 5 ] ]), 5)
	t.equal(__weave([], 10, [ [ 1 ], [ 2 ], [ 3 ] ]), 3)
})

test("array.__weaveTwo", (t) => {
	const a = [ 'x', 'a0', 'a1', 'a2', 'x' ]
	const b = [ 'x', 'b0', 'b1', 'b2', 'x' ]
	const call = (aStart, aEnd, bStart, bEnd) => {
		const dst = [ 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'y' ]
		__weaveTwo(dst, 2, a, aStart, aEnd, b, bStart, bEnd)
		return dst
	}

	t.equal(call(1, 3, 1, 4), [ 'y', 'y', 'a0', 'b0', 'a1', 'b1', 'b2', 'y' ])
	t.equal(call(1, 3, 1, 4).slice(2, 7), weaveTwo(a.slice(1, 3), b.slice(1, 4)))
	t.equal(call(1, 4, 2, 3), [ 'y', 'y', 'a0', 'b1', 'a1', 'a2', 'y', 'y' ])
	t.equal(call(2, 3, 3, 4), [ 'y', 'y', 'a1', 'b2', 'y', 'y', 'y', 'y' ])
	t.equal(call(2, 2, 1, 3), [ 'y', 'y', 'b0', 'b1', 'y', 'y', 'y', 'y' ])
	t.equal(call(1, 3, 2, 2), [ 'y', 'y', 'a0', 'a1', 'y', 'y', 'y', 'y' ])
	t.equal(call(2, 2, 2, 2), [ 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'y' ])
	t.equal(a, [ 'x', 'a0', 'a1', 'a2', 'x' ])
	t.equal(b, [ 'x', 'b0', 'b1', 'b2', 'x' ])
})
