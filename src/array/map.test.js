const { test } = require('@kmamal/testing')
const { map } = require('./map')

test("array.map", (t) => {
	t.equal(map([], (x) => 2 * x), [])
	t.equal(map([ 1, 2, 3 ], (x) => 2 * x), [ 2, 4, 6 ])
	t.equal(map([ 1, 2, 3 ], (x) => x), [ 1, 2, 3 ])
	t.equal(map([ 1, 2, 3 ], () => 5), [ 5, 5, 5 ])
})

test("array.map.$$$", (t) => {
	t.equal(map.$$$([], (x) => 2 * x), [])
	t.equal(map.$$$([ 1, 2, 3 ], (x) => 2 * x), [ 2, 4, 6 ])
	t.equal(map.$$$([ 1, 2, 3 ], (x) => x), [ 1, 2, 3 ])
	t.equal(map.$$$([ 1, 2, 3 ], () => 5), [ 5, 5, 5 ])
})
