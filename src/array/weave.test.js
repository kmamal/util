const { test } = require('@kmamal/testing')
const { weave } = require('./weave')

test("array.weave", (t) => {
	t.equal(weave([]), [])
	t.equal(weave([ [] ]), [])
	t.equal(weave([ [ 1, 2 ] ]), [ 1, 2 ])
	t.equal(weave([ [], [] ]), [])
	t.equal(weave([ [], [ 1 ] ]), [ 1 ])
	t.equal(weave([ [ 1 ], [] ]), [ 1 ])
	t.equal(weave([ [ 1 ], [ 2 ] ]), [ 1, 2 ])
	t.equal(weave([ [ 1 ], [ 2 ], [ 3 ] ]), [ 1, 2, 3 ])
	t.equal(weave([ [ 1, 3, 5 ], [ 2, 4 ] ]), [ 1, 2, 3, 4, 5 ])
	t.equal(weave([ [ 1, 3, 5, 6, 7 ], [ 2, 4 ] ]), [ 1, 2, 3, 4, 5, 6, 7 ])
	t.equal(weave([ [ 1, 3 ], [ 2, 4, 5, 6, 7 ] ]), [ 1, 2, 3, 4, 5, 6, 7 ])
	t.equal(weave([ [ 1, 4 ], [ 2 ], [ 3 ] ]), [ 1, 2, 3, 4 ])
	t.equal(weave([ [ 1, 4 ], [ 2, 5 ], [ 3 ] ]), [ 1, 2, 3, 4, 5 ])
	t.equal(weave([ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]), [ 1, 2, 3, 4, 5, 6 ])
	t.equal(
		weave([ [ 1, 4 ], [ 2, 5, 7, 9 ], [ 3, 6, 8 ] ]),
		[ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
	)
})
