const { test } = require('@xyz/tests')
const { fromFactory } = require('.')

test('array.fromFactory', (t) => {
	t.equal(fromFactory(0, () => {}), [])
	t.equal(fromFactory(3, () => 5), [ 5, 5, 5 ])
	t.equal(fromFactory(3, (i) => i), [ 0, 1, 2 ])
})
