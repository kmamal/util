const { test } = require('@kmamal/testing')
const { __forEach, __forEachIndexed, forEach } = require('./for-each')

test("array.forEach", (t) => {
	let sum
	const fn = (x) => { sum += x }

	sum = 0
	forEach([], fn)
	t.equal(sum, 0)

	sum = 0
	forEach([ 1 ], fn)
	t.equal(sum, 1)

	sum = 0
	forEach([ 1, 2, 3 ], fn)
	t.equal(sum, 6)
})

test("array.__forEach", (t) => {
	const calls = []
	const fn = (...args) => { calls.push(args) }

	__forEach([ 1, 2, 3, 4, 5 ], 1, 4, fn)
	t.equal(calls, [ [ 2 ], [ 3 ], [ 4 ] ])

	calls.length = 0
	__forEach([ 1, 2, 3 ], 1, 2, fn)
	t.equal(calls, [ [ 2 ] ])

	calls.length = 0
	__forEach([ 1, 2, 3 ], 1, 1, fn)
	t.equal(calls, [])
})

test("array.__forEachIndexed", (t) => {
	const calls = []
	const fn = (...args) => { calls.push(args) }

	__forEachIndexed([ 1, 2, 3, 4, 5 ], 1, 4, fn)
	t.equal(calls, [ [ 2, 1 ], [ 3, 2 ], [ 4, 3 ] ])

	calls.length = 0
	__forEachIndexed([ 1, 2, 3 ], 2, 3, fn)
	t.equal(calls, [ [ 3, 2 ] ])

	calls.length = 0
	__forEachIndexed([ 1, 2, 3 ], 1, 1, fn)
	t.equal(calls, [])
})
