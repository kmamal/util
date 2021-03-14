const { test } = require('@xyz/testing')
const { compactMap } = require('./compact-map')

test("array.compactMap", (t) => {
	t.equal(compactMap([], () => {}), [])
	t.equal(compactMap([ 1, 2, 3 ], (x) => x % 2), [ 1, 1 ])
	t.equal(compactMap([ 1, 2, 3 ], () => false), [])
	t.equal(compactMap([ 1, 2, 3 ], () => true), [ true, true, true ])
})

test("array.compactMap.$$$", (t) => {
	t.equal(compactMap.$$$([], () => {}), [])
	t.equal(compactMap.$$$([ 1, 2, 3 ], (x) => x % 2), [ 1, 1 ])
	t.equal(compactMap.$$$([ 1, 2, 3 ], () => false), [])
	t.equal(compactMap.$$$([ 1, 2, 3 ], () => true), [ true, true, true ])
})
