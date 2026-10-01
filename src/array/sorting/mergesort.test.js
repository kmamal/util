const { __mergesort } = require('./mergesort')
const { __insertionsort } = require('./insertionsort')
const { createTests, createRangeTests } = require('./testing/test-cases-for-stable-sort')

createTests('mergesort', (arr, start, end, fnCmp) => __mergesort(arr, start, end, fnCmp, 16, __insertionsort))

createRangeTests("array.sorting.__mergesort.no-cutoff", (arr, start, end, fnCmp) => __mergesort(arr, start, end, fnCmp, 0, __insertionsort))
