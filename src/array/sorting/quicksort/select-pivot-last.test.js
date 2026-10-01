const { test } = require('@kmamal/testing')
const { __selectPivotLast } = require('./select-pivot-last')

test("array.sorting.__selectPivotLast", (t) => {
	const arr = [ 9, 1, 2, 3, 8 ]
	t.equal(__selectPivotLast(arr, 1, 4), 3)
	t.equal(__selectPivotLast(arr, 1, 2), 1)
	t.equal(__selectPivotLast(arr, 0, 5), 8)
	t.equal(arr, [ 9, 1, 2, 3, 8 ])
})
