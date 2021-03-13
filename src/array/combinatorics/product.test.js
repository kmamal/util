const { test } = require('@xyz/testing')
const { product } = require('./product')

test("array.product", (t) => {
	t.equal([ ...product([]) ], [])
	t.equal([ ...product([ [ 1, 2, 3 ] ]) ], [ [ 1 ], [ 2 ], [ 3 ] ])
	t.equal([ ...product([ [ 1, 2 ], [ 3, 4 ] ]) ], [
		[ 1, 3 ],
		[ 1, 4 ],
		[ 2, 3 ],
		[ 2, 4 ],
	])
	t.equal([ ...product([ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]) ], [
		[ 1, 3, 5 ],
		[ 1, 3, 6 ],
		[ 1, 4, 5 ],
		[ 1, 4, 6 ],
		[ 2, 3, 5 ],
		[ 2, 3, 6 ],
		[ 2, 4, 5 ],
		[ 2, 4, 6 ],
	])
	t.equal([ ...product([ [ 1, 2 ], [ 3, 4 ], [] ]) ], [])
})
