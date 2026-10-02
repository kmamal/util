const { testVariants } = require('../testing/test-variants')
const { empty$$$ } = require('./empty')

testVariants("object.empty", empty$$$, (t, f) => {
	t.equal(f({}), {})
	t.equal(f({ a: 1 }), {})
	t.equal(f({ a: 1, b: 2 }), {})

	const withSymbol = f({ a: 1, [Symbol('s')]: 2 })
	t.equal(Reflect.ownKeys(withSymbol), [])
}, { base: null, to: null, $$$: empty$$$ })
