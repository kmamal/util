const { test } = require('@kmamal/testing')
const { concat, concatTo, concat$$$ } = require('./concat')

test("array.concat", (t) => {
	t.equal(concat([]), [])
	t.equal(concat([ [] ]), [])
	t.equal(concat([ [], [], [] ]), [])
	t.equal(concat([ [ 1, 2, 3 ] ]), [ 1, 2, 3 ])
	t.equal(concat([ [ 1 ], [ 2 ], [ 3 ] ]), [ 1, 2, 3 ])
	t.equal(concat([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
	t.equal(concat([ [ [] ], [ {} ], [ null ], [ undefined ] ]), [ [], {}, null, undefined ])

	const arrs = [ [ 1 ], [ 2 ] ]
	const res = concat(arrs)
	t.equal(arrs, [ [ 1 ], [ 2 ] ])
	t.ok(res !== arrs)
	t.ok(concat.to === concatTo)
	t.ok(concat.$$$ === concat$$$)
})

test("array.concatTo", (t) => {
	t.equal(concatTo([], []), [])
	t.equal(concatTo([], [ [] ]), [])
	t.equal(concatTo([], [ [], [], [] ]), [])
	t.equal(concatTo([], [ [ 1, 2, 3 ] ]), [ 1, 2, 3 ])
	t.equal(concatTo([], [ [ 1 ], [ 2 ], [ 3 ] ]), [ 1, 2, 3 ])
	t.equal(concatTo([], [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
	t.equal(concatTo([], [ [ [] ], [ {} ], [ null ], [ undefined ] ]), [ [], {}, null, undefined ])
})

test("array.concat$$$", (t) => {
	t.equal(concat$$$([]), [])
	t.equal(concat$$$([ [] ]), [])
	t.equal(concat$$$([ [], [], [] ]), [])
	t.equal(concat$$$([ [ 1, 2, 3 ] ]), [ 1, 2, 3 ])
	t.equal(concat$$$([ [ 1 ], [ 2 ], [ 3 ] ]), [ 1, 2, 3 ])
	t.equal(concat$$$([ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]), [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ])
	t.equal(concat$$$([ [ [] ], [ {} ], [ null ], [ undefined ] ]), [ [], {}, null, undefined ])
})
