const { test } = require('@xyz/testing')
const { includes, includesSorted } = require('.')

test('array.includes', (t) => {
	t.equal(includes([], 1), false)
	t.equal(includes([ 1, 3, 2 ], 1), true)
	t.equal(includes([ 1, 3, 2 ], 2), true)
	t.equal(includes([ 1, 3, 2 ], 3), true)
	t.equal(includes([ 1, 3, 2 ], 0), false)
	t.equal(includes([ 1, 3, 2 ], 5), false)

	t.equal(includes([ 1, 3, 2 ], '1'), false) // !!!
})

test('array.includesSorted', (t) => {
	t.equal(includesSorted([], 1), false)
	t.equal(includesSorted([ 1, 2, 3 ], 1), true)
	t.equal(includesSorted([ 1, 2, 3 ], 2), true)
	t.equal(includesSorted([ 1, 2, 3 ], 3), true)
	t.equal(includesSorted([ 1, 2, 3 ], 0), false)
	t.equal(includesSorted([ 1, 2, 3 ], 5), false)

	t.equal(includesSorted([ 1, 2, 3 ], '1'), true) // !!!
})
