const { testVariants, junkObject } = require('../testing/test-variants')
const { defaults } = require('./defaults')

testVariants("object.defaults", defaults, (t, f) => {
	t.equal(f({}, {}), {})
	t.equal(f({ a: 1 }, {}), { a: 1 })
	t.equal(f({ a: 1 }, { a: 2 }), { a: 1 })
	t.equal(f({ a: 1 }, { b: 2 }), { a: 1, b: 2 })
	t.equal(f({ a: undefined }, { a: 1 }), { a: 1 })
	t.ok(Object.hasOwn(f({ a: undefined }, {}), 'a'))
	t.equal(f({}, { toString: 1 }).toString, 1)

	const s = Symbol('s')
	const d = Symbol('d')
	const withSymbols = f({ a: 1, [s]: 1, [d]: undefined }, { [s]: 2, [d]: 2 })
	t.equal(withSymbols[s], 1)
	t.equal(withSymbols[d], 2)
}, { dst: junkObject })
