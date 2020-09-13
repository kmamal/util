const { test } = require('@xyz/tests')
const { prefixSums } = require('.')

test('array.prefixSums', (t) => {
	t.equal(prefixSums([]), [])
	t.equal(prefixSums([ 1 ]), [ 1 ])
	t.equal(prefixSums([ 1, 2, 3 ]), [ 1, 3, 6 ])
})

test('array.prefixSums.$$$', (t) => {
	t.equal(prefixSums.$$$([]), [])
	t.equal(prefixSums.$$$([ 1 ]), [ 1 ])
	t.equal(prefixSums.$$$([ 1, 2, 3 ]), [ 1, 3, 6 ])
})
