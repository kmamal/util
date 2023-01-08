const { test } = require('@kmamal/testing')
const { splitWith, splitBy, split } = require('./split')

const square = (x) => x * x

test('array.split', (t) => {
	t.equal(split([], 1), [ [] ])
	t.equal(split([ 1 ], 1), [ [], [] ])
	t.equal(split([ 1, 2, 3 ], 1), [ [], [ 2, 3 ] ])
	t.equal(split([ 1, 2, 3 ], 2), [ [ 1 ], [ 3 ] ])
	t.equal(split([ 1, 2, 3 ], 3), [ [ 1, 2 ], [] ])
	t.equal(split([ 1, 2, 3 ], 4), [ [ 1, 2, 3 ] ])
})

test('array.splitBy', (t) => {
	t.equal(splitBy([], 1, square), [ [] ])
	t.equal(splitBy([ 2 ], 4, square), [ [], [] ])
	t.equal(splitBy([ 2, 3, 4 ], 4, square), [ [], [ 3, 4 ] ])
	t.equal(splitBy([ 2, 3, 4 ], 9, square), [ [ 2 ], [ 4 ] ])
	t.equal(splitBy([ 2, 3, 4 ], 16, square), [ [ 2, 3 ], [] ])
	t.equal(splitBy([ 2, 3, 4 ], 1, square), [ [ 2, 3, 4 ] ])
})

test('array.splitWith', (t) => {
	t.equal(splitWith([], null, () => false), [ [] ])
	t.equal(splitWith([ 1 ], null, () => true), [ [], [] ])
	t.equal(splitWith([ 1, 2, 3 ], null, (x) => x === 1), [ [], [ 2, 3 ] ])
	t.equal(splitWith([ 1, 2, 3 ], null, (x) => x === 2), [ [ 1 ], [ 3 ] ])
	t.equal(splitWith([ 1, 2, 3 ], null, (x) => x === 3), [ [ 1, 2 ], [] ])
	t.equal(splitWith([ 1, 2, 3 ], null, (x) => x === 4), [ [ 1, 2, 3 ] ])
})

test('array.split.$$$', (t) => {
	t.equal(split.$$$([], 1), [ [] ])
	t.equal(split.$$$([ 1 ], 1), [ [], [] ])
	t.equal(split.$$$([ 1, 2, 3 ], 1), [ [], [ 2, 3 ] ])
	t.equal(split.$$$([ 1, 2, 3 ], 2), [ [ 1 ], [ 3 ] ])
	t.equal(split.$$$([ 1, 2, 3 ], 3), [ [ 1, 2 ], [] ])
	t.equal(split.$$$([ 1, 2, 3 ], 4), [ [ 1, 2, 3 ] ])
})

test('array.splitBy.$$$', (t) => {
	t.equal(splitBy.$$$([], 1, square), [ [] ])
	t.equal(splitBy.$$$([ 2 ], 4, square), [ [], [] ])
	t.equal(splitBy.$$$([ 2, 3, 4 ], 4, square), [ [], [ 3, 4 ] ])
	t.equal(splitBy.$$$([ 2, 3, 4 ], 9, square), [ [ 2 ], [ 4 ] ])
	t.equal(splitBy.$$$([ 2, 3, 4 ], 16, square), [ [ 2, 3 ], [] ])
	t.equal(splitBy.$$$([ 2, 3, 4 ], 1, square), [ [ 2, 3, 4 ] ])
})

test('array.splitWith.$$$', (t) => {
	t.equal(splitWith.$$$([], null, () => false), [ [] ])
	t.equal(splitWith.$$$([ 1 ], null, () => true), [ [], [] ])
	t.equal(splitWith.$$$([ 1, 2, 3 ], null, (x) => x === 1), [ [], [ 2, 3 ] ])
	t.equal(splitWith.$$$([ 1, 2, 3 ], null, (x) => x === 2), [ [ 1 ], [ 3 ] ])
	t.equal(splitWith.$$$([ 1, 2, 3 ], null, (x) => x === 3), [ [ 1, 2 ], [] ])
	t.equal(splitWith.$$$([ 1, 2, 3 ], null, (x) => x === 4), [ [ 1, 2, 3 ] ])
})
