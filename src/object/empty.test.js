const { testVariants } = require('../testing/test-variants')
const { empty$$$ } = require('./empty')

testVariants("object.empty", empty$$$, (t, f) => {
	t.equal(f({}), {})
	t.equal(f({ a: 1 }), {})
	t.equal(f({ a: 1, b: 2 }), {})
}, { base: null, to: null, $$$: empty$$$ })
