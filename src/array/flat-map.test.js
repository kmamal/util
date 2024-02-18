const { test } = require('@kmamal/testing')
const { flatMap } = require('./flat-map')

test("array.flatMap", (t) => {
	t.equal(flatMap([], () => {}), [])
	t.equal(flatMap([], () => [ 1, 2, 3 ]), [])
	t.equal(flatMap([ 1 ], (x) => [ x ]), [ 1 ])
	t.equal(flatMap([ 1, 2, 3 ], () => []), [])
	t.equal(flatMap([ 1, 2, 3 ], (x) => [ x ]), [ 1, 2, 3 ])
	t.equal(flatMap([ 1, 2, 3 ], (x) => [ x * 2 ]), [ 2, 4, 6 ])
	t.equal(flatMap([ 1, 2, 3 ], (x) => [ x, x * 2 ]), [ 1, 2, 2, 4, 3, 6 ])
})

test("array.flatMap.to", (t) => {
	t.equal(flatMap.to([], [], () => {}), [])
	t.equal(flatMap.to([], [], () => [ 1, 2, 3 ]), [])
	t.equal(flatMap.to([], [ 1 ], (x) => [ x ]), [ 1 ])
	t.equal(flatMap.to([], [ 1, 2, 3 ], () => []), [])
	t.equal(flatMap.to([], [ 1, 2, 3 ], (x) => [ x ]), [ 1, 2, 3 ])
	t.equal(flatMap.to([], [ 1, 2, 3 ], (x) => [ x * 2 ]), [ 2, 4, 6 ])
	t.equal(flatMap.to([], [ 1, 2, 3 ], (x) => [ x, x * 2 ]), [ 1, 2, 2, 4, 3, 6 ])
})

test("array.flatMap.$$$", (t) => {
	t.equal(flatMap.$$$([], () => {}), [])
	t.equal(flatMap.$$$([], () => [ 1, 2, 3 ]), [])
	t.equal(flatMap.$$$([ 1 ], (x) => [ x ]), [ 1 ])
	t.equal(flatMap.$$$([ 1, 2, 3 ], () => []), [])
	t.equal(flatMap.$$$([ 1, 2, 3 ], (x) => [ x ]), [ 1, 2, 3 ])
	t.equal(flatMap.$$$([ 1, 2, 3 ], (x) => [ x * 2 ]), [ 2, 4, 6 ])
	t.equal(flatMap.$$$([ 1, 2, 3 ], (x) => [ x, x * 2 ]), [ 1, 2, 2, 4, 3, 6 ])
})
