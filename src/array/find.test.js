const { test } = require('@xyz/testing')
const { findIndex, findIndexRight, find, findRight } = require('.')

test('array.findIndex', (t) => {
	t.equal(findIndex([], () => true), -1)
	t.equal(findIndex([ 1 ], (x) => x > 1), -1)
	t.equal(findIndex([ 1 ], (x) => x === 1), 0)
	t.equal(findIndex([ 1, 2, 3 ], (x) => x > 1), 1)
	t.equal(findIndex([ 1, 2, 3 ], (x) => x > 5), -1)
})

test('array.find', (t) => {
	t.equal(find([], () => true), undefined)
	t.equal(find([ 1 ], (x) => x > 1), undefined)
	t.equal(find([ 1 ], (x) => x === 1), 1)
	t.equal(find([ 1, 2, 3 ], (x) => x > 1), 2)
	t.equal(find([ 1, 2, 3 ], (x) => x > 5), undefined)
})

test('array.findIndexRight', (t) => {
	t.equal(findIndexRight([], () => true), -1)
	t.equal(findIndexRight([ 1 ], (x) => x > 1), -1)
	t.equal(findIndexRight([ 1 ], (x) => x === 1), 0)
	t.equal(findIndexRight([ 1, 2, 3 ], (x) => x > 1), 2)
	t.equal(findIndexRight([ 1, 2, 3 ], (x) => x > 5), -1)
})

test('array.findRight', (t) => {
	t.equal(findRight([], () => true), undefined)
	t.equal(findRight([ 1 ], (x) => x > 1), undefined)
	t.equal(findRight([ 1 ], (x) => x === 1), 1)
	t.equal(findRight([ 1, 2, 3 ], (x) => x > 1), 3)
	t.equal(findRight([ 1, 2, 3 ], (x) => x > 5), undefined)
})
