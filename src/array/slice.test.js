const { testVariants } = require('../testing/test-variants')
const { sliceTo, slice$$$ } = require('./slice')

testVariants("array.slice", sliceTo, (t, f) => {
	t.equal(f([], 0), [])
	t.equal(f([ 1, 2, 3, 4, 5 ]), [ 1, 2, 3, 4, 5 ])
	t.equal(f([ 1, 2, 3, 4, 5 ], 1, 3), [ 2, 3 ])
	t.equal(f([ 1, 2, 3, 4, 5 ], -2), [ 4, 5 ])
	t.equal(f([ 1, 2, 3, 4, 5 ], 3, 1), [])
	t.equal(f([ 1, 2, 3, 4, 5 ], 1, -1), [ 2, 3, 4 ])
}, { base: null, to: sliceTo, $$$: slice$$$ })
