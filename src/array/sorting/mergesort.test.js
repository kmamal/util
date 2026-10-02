const { test } = require('@kmamal/testing')
const { __mergesort, mergesort, mergesortWith } = require('./mergesort')
const { __insertionsort } = require('./insertionsort')
const { createTests, createRangeTests } = require('./testing/test-cases-for-stable-sort')

createTests('mergesort', (arr, start, end, fnCmp) => __mergesort(arr, start, end, fnCmp, 16, __insertionsort))

createRangeTests("array.sorting.__mergesort.no-cutoff", (arr, start, end, fnCmp) => __mergesort(arr, start, end, fnCmp, 0, __insertionsort))

test("mergesort nested call in comparator", (t) => {
	const arr = Array.from({ length: 100 }, (_, i) => (i * 37) % 100)
	const inner = Array.from({ length: 40 }, (_, i) => -i)
	const res = mergesortWith(arr, (a, b) => {
		mergesort(inner)
		return a - b
	})
	t.equal(res, Array.from({ length: 100 }, (_, i) => i))
})
