const { __sort } = require('./sort')
const { createRangeTests } = require('./sorting/testing/test-cases-for-stable-sort')

createRangeTests("array.__sort", __sort)
