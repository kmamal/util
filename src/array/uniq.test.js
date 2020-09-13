const { test } = require('@xyz/tests')
const { uniq, uniqSorted } = require('.')

test('array.uniq', (t) => {
	t.equal(uniq([]), [])
	t.equal(uniq([ 1 ]), [ 1 ])
	t.equal(uniq([ 1, 2, 3 ]), [ 1, 2, 3 ])
	t.equal(uniq([ 1, 2, 2, 2, 3, 3 ]), [ 1, 2, 3 ])
	t.equal(uniq([ 1, 2, 3, 1, 2, 3, 1, 2, 3 ]), [ 1, 2, 3 ])
})

test('array.uniq.$$$', (t) => {
	t.equal(uniq.$$$([]), [])
	t.equal(uniq.$$$([ 1 ]), [ 1 ])
	t.equal(uniq.$$$([ 1, 2, 3 ]), [ 1, 2, 3 ])
	t.equal(uniq.$$$([ 1, 2, 2, 2, 3, 3 ]), [ 1, 2, 3 ])
	t.equal(uniq.$$$([ 1, 2, 3, 1, 2, 3, 1, 2, 3 ]), [ 1, 2, 3 ])
})

test('array.uniqSorted', (t) => {
	t.equal(uniqSorted([]), [])
	t.equal(uniqSorted([ 1 ]), [ 1 ])
	t.equal(uniqSorted([ 1, 2, 3 ]), [ 1, 2, 3 ])
	t.equal(uniqSorted([ 1, 2, 2, 2, 3, 3 ]), [ 1, 2, 3 ])
})

test('array.uniqSorted.$$$', (t) => {
	t.equal(uniqSorted.$$$([]), [])
	t.equal(uniqSorted.$$$([ 1 ]), [ 1 ])
	t.equal(uniqSorted.$$$([ 1, 2, 3 ]), [ 1, 2, 3 ])
	t.equal(uniqSorted.$$$([ 1, 2, 2, 2, 3, 3 ]), [ 1, 2, 3 ])
})
