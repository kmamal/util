const { test } = require('@kmamal/testing')
const { __shellsort } = require('./shellsort')
const { compare } = require('../../function/compare')

require('./testing/test-cases-for-unstable-sort').createTests('shellsort', (arr, start, end, fnCmp) => __shellsort(arr, start, start + 1, end, fnCmp))

test("array.sorting.__shellsort.sorted-prefix", (t) => {
	const arr = [ 9, 8, 1, 3, 5, 7, 4, 2, 6, 0, -1 ]
	__shellsort(arr, 2, 6, 9, compare)
	t.equal(arr, [ 9, 8, 1, 2, 3, 4, 5, 6, 7, 0, -1 ])

	const arr2 = [ 9, 1, 2, 3, -1 ]
	__shellsort(arr2, 1, 4, 4, compare)
	t.equal(arr2, [ 9, 1, 2, 3, -1 ])

	const arr3 = [ 9, 3, 2, 1, -1 ]
	__shellsort(arr3, 1, 1, 4, compare)
	t.equal(arr3, [ 9, 1, 2, 3, -1 ])
})
