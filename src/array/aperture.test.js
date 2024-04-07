const { test } = require('@kmamal/testing')
const { aperture } = require('./aperture')

test("array.aperture", (t) => {
	t.equal(aperture([], 1), [])
	t.equal(aperture([ 1 ], 1), [ [ 1 ] ])
	t.equal(aperture([ 1, 2, 3 ], 1), [ [ 1 ], [ 2 ], [ 3 ] ])
	t.equal(aperture([ 1, 2, 3 ], 2), [ [ 1, 2 ], [ 2, 3 ] ])
	t.equal(aperture([ 1, 2, 3 ], 3), [ [ 1, 2, 3 ] ])
	t.equal(aperture([ 1, 2, 3 ], 4), [ [ 1, 2, 3 ] ])
	t.equal(aperture([ 1, 2, 3, 4, 5 ], 2), [ [ 1, 2 ], [ 2, 3 ], [ 3, 4 ], [ 4, 5 ] ])
})

test("array.aperture.$$$", (t) => {
	t.equal(aperture.$$$([], 1), [])
	t.equal(aperture.$$$([ 1 ], 1), [ [ 1 ] ])
	t.equal(aperture.$$$([ 1, 2, 3 ], 1), [ [ 1 ], [ 2 ], [ 3 ] ])
	t.equal(aperture.$$$([ 1, 2, 3 ], 2), [ [ 1, 2 ], [ 2, 3 ] ])
	t.equal(aperture.$$$([ 1, 2, 3 ], 3), [ [ 1, 2, 3 ] ])
	t.equal(aperture.$$$([ 1, 2, 3 ], 4), [ [ 1, 2, 3 ] ])
	t.equal(aperture.$$$([ 1, 2, 3, 4, 5 ], 2), [ [ 1, 2 ], [ 2, 3 ], [ 3, 4 ], [ 4, 5 ] ])
})
