const { test } = require('@kmamal/testing')
const { __binsertionsort } = require('./binsertionsort')
const { compare } = require('../../function/compare')

require('./testing/test-cases-for-stable-sort').createTests('binsertionsort', (arr, start, end, fnCmp) => __binsertionsort(arr, start, start + 1, end, fnCmp))

test("array.sorting.__binsertionsort.sorted-prefix", (t) => {
	const arr = [ 9, 8, 1, 3, 5, 7, 4, 2, 6, 0, -1 ]
	__binsertionsort(arr, 2, 6, 9, compare)
	t.equal(arr, [ 9, 8, 1, 2, 3, 4, 5, 6, 7, 0, -1 ])

	const arr2 = [ 9, 1, 2, 3, -1 ]
	__binsertionsort(arr2, 1, 4, 4, compare)
	t.equal(arr2, [ 9, 1, 2, 3, -1 ])

	const arr3 = [ 9, 3, 2, 1, -1 ]
	__binsertionsort(arr3, 1, 1, 4, compare)
	t.equal(arr3, [ 9, 1, 2, 3, -1 ])
})
