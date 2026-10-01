const { testVariants } = require('../testing/test-variants')
const { toEntries } = require('./to-entries')

testVariants("object.to-entries", toEntries, (t, f) => {
	t.equal(f({}), [])
	t.equal(f({ a: 1 }), [ [ 'a', 1 ] ])
	t.equal(f({ a: 1, b: 2 }), [ [ 'a', 1 ], [ 'b', 2 ] ])
}, { $$$: null })
