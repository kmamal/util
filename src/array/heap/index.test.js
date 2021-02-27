const { test } = require('@xyz/testing')
const {
	heapify,
	pop,
	heapifyBy,
	popBy,
	heapifyWith,
	popWith,
} = require('.')

const { map } = require('../map')
const { sort } = require('../sort')

const N = 1000

test("array.heap", (t) => {
	const arr = new Array(N)
	map.$$$(arr, Math.random)
	const expected = sort(arr)

	const sorted = new Array(N)
	heapify(arr)
	for (let i = 0; i < N; i++) {
		sorted[i] = pop(arr)
	}

	t.equal(arr.length, 0)
	t.equal(sorted, expected)
})

test("array.heapBy", (t) => {
	const arr = new Array(N)
	map.$$$(arr, Math.random)
	const expected = sort(arr)

	const fn = (x) => 2 * x

	const sorted = new Array(N)
	heapifyBy(arr, fn)
	for (let i = 0; i < N; i++) {
		sorted[i] = popBy(arr, fn)
	}

	t.equal(arr.length, 0)
	t.equal(sorted, expected)
})

test("array.heapWith", (t) => {
	const arr = new Array(N)
	map.$$$(arr, Math.random)
	const expected = sort(arr)

	const fn = (a, b) => a - b

	const sorted = new Array(N)
	heapifyWith(arr, fn)
	for (let i = 0; i < N; i++) {
		sorted[i] = popWith(arr, fn)
	}

	t.equal(arr.length, 0)
	t.equal(sorted, expected)
})
