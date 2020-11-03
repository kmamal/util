const { test } = require('@xyz/testing')
const {
	bisect,
	bisectLeft,
	bisectRight,
	bisectBy,
	bisectLeftBy,
	bisectRightBy,
	bisectByPure,
	bisectLeftByPure,
	bisectRightByPure,
} = require('.')

test('arra.bisect', (t) => {
	t.equal(bisect([], 0), 0)
	t.equal(bisect([ 1 ], 0), 0)
	t.equal(bisect([ 1 ], 1), 0)
	t.equal(bisect([ 1 ], 2), 1)
	t.equal(bisect([ 1, 2, 3 ], 0), 0)
	t.equal(bisect([ 1, 2, 3 ], 1), 0)
	t.equal(bisect([ 1, 2, 3 ], 2), 1)
	t.equal(bisect([ 1, 2, 3 ], 3), 2)
	t.equal(bisect([ 1, 2, 3 ], 4), 3)
})

test('arra.bisectLeft', (t) => {
	t.equal(bisectLeft([], 0), 0)
	t.equal(bisectLeft([ 1 ], 0), 0)
	t.equal(bisectLeft([ 1 ], 1), 0)
	t.equal(bisectLeft([ 1 ], 2), 1)
	t.equal(bisectLeft([ 1, 2, 3 ], 0), 0)
	t.equal(bisectLeft([ 1, 2, 3 ], 1), 0)
	t.equal(bisectLeft([ 1, 2, 3 ], 2), 1)
	t.equal(bisectLeft([ 1, 2, 3 ], 3), 2)
	t.equal(bisectLeft([ 1, 2, 3 ], 4), 3)
	t.equal(bisectLeft([ 2, 2, 2 ], 2), 0)
})

test('arra.bisectRight', (t) => {
	t.equal(bisectRight([], 0), 0)
	t.equal(bisectRight([ 1 ], 0), 0)
	t.equal(bisectRight([ 1 ], 1), 1)
	t.equal(bisectRight([ 1 ], 2), 1)
	t.equal(bisectRight([ 1, 2, 3 ], 0), 0)
	t.equal(bisectRight([ 1, 2, 3 ], 1), 1)
	t.equal(bisectRight([ 1, 2, 3 ], 2), 2)
	t.equal(bisectRight([ 1, 2, 3 ], 3), 3)
	t.equal(bisectRight([ 1, 2, 3 ], 4), 3)
	t.equal(bisectRight([ 2, 2, 2 ], 2), 3)
})

test('arra.bisectBy', (t) => {
	t.equal(bisectBy([], 0, (x) => 2 * x), 0)
	t.equal(bisectBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(bisectBy([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(bisectBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(bisectBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(bisectBy([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(bisectBy([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(bisectBy([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(bisectBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
})

test('arra.bisectLeftBy', (t) => {
	t.equal(bisectLeftBy([], 0, (x) => 2 * x), 0)
	t.equal(bisectLeftBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(bisectLeftBy([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(bisectLeftBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(bisectLeftBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(bisectLeftBy([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(bisectLeftBy([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(bisectLeftBy([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(bisectLeftBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(bisectLeftBy([ 2, 2, 2 ], 2, (x) => 2 * x), 0)
})

test('arra.bisectRightBy', (t) => {
	t.equal(bisectRightBy([], 0, (x) => 2 * x), 0)
	t.equal(bisectRightBy([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(bisectRightBy([ 1 ], 1, (x) => 2 * x), 1)
	t.equal(bisectRightBy([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(bisectRightBy([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(bisectRightBy([ 1, 2, 3 ], 1, (x) => 2 * x), 1)
	t.equal(bisectRightBy([ 1, 2, 3 ], 2, (x) => 2 * x), 2)
	t.equal(bisectRightBy([ 1, 2, 3 ], 3, (x) => 2 * x), 3)
	t.equal(bisectRightBy([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(bisectRightBy([ 2, 2, 2 ], 2, (x) => 2 * x), 3)
})

test('arra.bisectByPure', (t) => {
	t.equal(bisectByPure([], 0, (x) => 2 * x), 0)
	t.equal(bisectByPure([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(bisectByPure([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(bisectByPure([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(bisectByPure([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(bisectByPure([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(bisectByPure([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(bisectByPure([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(bisectByPure([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
})

test('arra.bisectLeftByPure', (t) => {
	t.equal(bisectLeftByPure([], 0, (x) => 2 * x), 0)
	t.equal(bisectLeftByPure([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(bisectLeftByPure([ 1 ], 1, (x) => 2 * x), 0)
	t.equal(bisectLeftByPure([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(bisectLeftByPure([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(bisectLeftByPure([ 1, 2, 3 ], 1, (x) => 2 * x), 0)
	t.equal(bisectLeftByPure([ 1, 2, 3 ], 2, (x) => 2 * x), 1)
	t.equal(bisectLeftByPure([ 1, 2, 3 ], 3, (x) => 2 * x), 2)
	t.equal(bisectLeftByPure([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(bisectLeftByPure([ 2, 2, 2 ], 2, (x) => 2 * x), 0)
})

test('arra.bisectRightByPure', (t) => {
	t.equal(bisectRightByPure([], 0, (x) => 2 * x), 0)
	t.equal(bisectRightByPure([ 1 ], 0, (x) => 2 * x), 0)
	t.equal(bisectRightByPure([ 1 ], 1, (x) => 2 * x), 1)
	t.equal(bisectRightByPure([ 1 ], 2, (x) => 2 * x), 1)
	t.equal(bisectRightByPure([ 1, 2, 3 ], 0, (x) => 2 * x), 0)
	t.equal(bisectRightByPure([ 1, 2, 3 ], 1, (x) => 2 * x), 1)
	t.equal(bisectRightByPure([ 1, 2, 3 ], 2, (x) => 2 * x), 2)
	t.equal(bisectRightByPure([ 1, 2, 3 ], 3, (x) => 2 * x), 3)
	t.equal(bisectRightByPure([ 1, 2, 3 ], 4, (x) => 2 * x), 3)
	t.equal(bisectRightByPure([ 2, 2, 2 ], 2, (x) => 2 * x), 3)
})
