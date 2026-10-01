const { testVariants } = require('../testing/test-variants')
const { compact } = require('./compact')

testVariants("array.compact", compact, (t, f) => {
	t.equal(f([]), [])
	t.equal(f([ 0, NaN, '', false, null, undefined ]), [])
	t.equal(f([ 1, '0', 'null', 'false', [], {} ]), [ 1, '0', 'null', 'false', [], {} ])
})
