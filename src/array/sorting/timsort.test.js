const { __timsort, __timsort2 } = require('./timsort')
const { createTests, createRangeTests } = require('./testing/test-cases-for-stable-sort')

createTests('timsort', __timsort)

createRangeTests("array.sorting.__timsort2", __timsort2)
