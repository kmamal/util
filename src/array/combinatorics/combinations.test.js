const { test } = require('@xyz/testing')
const { combinations } = require('./combinations')

const arr = [ 1, 2, 3, 4 ]

test("array.combinations", (t) => {
	t.equal([ ...combinations(arr, 0) ], [ [] ])
	t.equal([ ...combinations(arr, 1) ], [ [ 1 ], [ 2 ], [ 3 ], [ 4 ] ])
	t.equal([ ...combinations(arr, 2) ], [
		[ 1, 2 ],
		[ 1, 3 ],
		[ 1, 4 ],
		[ 2, 3 ],
		[ 2, 4 ],
		[ 3, 4 ],
	])
	t.equal([ ...combinations(arr, 3) ], [
		[ 1, 2, 3 ],
		[ 1, 2, 4 ],
		[ 1, 3, 4 ],
		[ 2, 3, 4 ],
	])
	t.equal([ ...combinations(arr, 4) ], [ [ 1, 2, 3, 4 ] ])
})
