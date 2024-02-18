const { test } = require('@kmamal/testing')
const { interpose, interposeAll } = require('./interpose')

test("array.interpose", (t) => {
	t.equal(interpose([], 0), [])
	t.equal(interpose([ 1 ], 0), [ 1 ])
	t.equal(interpose([ 1, 2 ], 0), [ 1, 0, 2 ])
	t.equal(interpose([ 1, 2, 3 ], 0), [ 1, 0, 2, 0, 3 ])
})

test("array.interpose.to", (t) => {
	t.equal(interpose.to([], [], 0), [])
	t.equal(interpose.to([], [ 1 ], 0), [ 1 ])
	t.equal(interpose.to([], [ 1, 2 ], 0), [ 1, 0, 2 ])
	t.equal(interpose.to([], [ 1, 2, 3 ], 0), [ 1, 0, 2, 0, 3 ])
})

test("array.interpose.$$$", (t) => {
	t.equal(interpose.$$$([], 0), [])
	t.equal(interpose.$$$([ 1 ], 0), [ 1 ])
	t.equal(interpose.$$$([ 1, 2 ], 0), [ 1, 0, 2 ])
	t.equal(interpose.$$$([ 1, 2, 3 ], 0), [ 1, 0, 2, 0, 3 ])
})

test("array.interposeAll", (t) => {
	t.equal(interposeAll([], [ 0 ]), [])
	t.equal(interposeAll([ 1 ], [ 0 ]), [ 1 ])
	t.equal(interposeAll([ 1, 2, 3 ], [ 0 ]), [ 1, 0, 2, 0, 3 ])
	t.equal(interposeAll([ 1, 2, 3 ], [ 8, 9 ]), [ 1, 8, 9, 2, 8, 9, 3 ])
})

test("array.interposeAll.to", (t) => {
	t.equal(interposeAll.to([], [], [ 0 ]), [])
	t.equal(interposeAll.to([], [ 1 ], [ 0 ]), [ 1 ])
	t.equal(interposeAll.to([], [ 1, 2, 3 ], [ 0 ]), [ 1, 0, 2, 0, 3 ])
	t.equal(interposeAll.to([], [ 1, 2, 3 ], [ 8, 9 ]), [ 1, 8, 9, 2, 8, 9, 3 ])
})

test("array.interposeAll.$$$", (t) => {
	t.equal(interposeAll.$$$([], [ 0 ]), [])
	t.equal(interposeAll.$$$([ 1 ], [ 0 ]), [ 1 ])
	t.equal(interposeAll.$$$([ 1, 2, 3 ], [ 0 ]), [ 1, 0, 2, 0, 3 ])
	t.equal(interposeAll.$$$([ 1, 2, 3 ], [ 8, 9 ]), [ 1, 8, 9, 2, 8, 9, 3 ])
})
