
require('./testing/test-cases-for-unstable-sort').createTests('quicksort')

const { test } = require('@kmamal/testing')
const { __quicksort } = require('./quicksort')
const { compare } = require('../../function/compare')
const { create } = require('../create')

test("array.sorting.__quicksort.fractional-depth-cutoff", (t) => {
	const a = create(100, Math.random)
	let takeovers = 0
	__quicksort(a, 0, a.length, compare, 1, 1.5, () => { takeovers++ })
	t.ok(takeovers > 0)
})
