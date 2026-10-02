const { testVariants } = require('../testing/test-variants')
const { toEntries } = require('./to-entries')

testVariants("object.to-entries", toEntries, (t, f) => {
	t.equal(f({}), [])
	t.equal(f({ a: 1 }), [ [ 'a', 1 ] ])
	t.equal(f({ a: 1, b: 2 }), [ [ 'a', 1 ], [ 'b', 2 ] ])
}, { $$$: null })

testVariants("object.to-entries symbols", toEntries, (t, f) => {
	const s = Symbol('s')
	const obj = { a: 1, [s]: 2 }
	Object.defineProperty(obj, Symbol('hidden'), { value: 3, enumerable: false })
	t.equal(f(obj), [ [ 'a', 1 ], [ s, 2 ] ])
}, { $$$: null })
