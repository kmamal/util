const { testVariants } = require('../testing/test-variants')
const { prefixSums, prefixSumsBy } = require('./prefix-sums')

testVariants("array.prefixSums", prefixSums, (t, f) => {
	t.equal(f([]), [])
	t.equal(f([ 1 ]), [ 1 ])
	t.equal(f([ 1, 2, 3 ]), [ 1, 3, 6 ])
})

testVariants("array.prefixSumsBy", prefixSumsBy, (t, f) => {
	t.equal(f([], (x) => 2 * x), [])
	t.equal(f([ 1 ], (x) => 2 * x), [ 2 ])
	t.equal(f([ 1, 2, 3 ], (x) => 2 * x), [ 2, 6, 12 ])
	t.equal(f([ { v: 1 }, { v: 2 } ], (x) => x.v), [ 1, 3 ])
})
