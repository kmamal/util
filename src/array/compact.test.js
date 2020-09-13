const { test } = require('@xyz/tests')
const { compact } = require('.')

test('array.compact', (t) => {
	t.equal(compact([]), [])
	t.equal(compact([ 0, NaN, '', false, null, undefined ]), [])
	t.equal(compact([ 1, '0', 'null', 'false', [], {} ]), [ 1, '0', 'null', 'false', [], {} ])
})

test('array.compact.$$$', (t) => {
	t.equal(compact.$$$([]), [])
	t.equal(compact.$$$([ 0, NaN, '', false, null, undefined ]), [])
	t.equal(compact.$$$([ 1, '0', 'null', 'false', [], {} ]), [ 1, '0', 'null', 'false', [], {} ])
})
