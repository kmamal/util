const { test } = require('@kmamal/testing')
const {
	__interpolationSearch,
	interpolationSearch,
	interpolationSearchFirst,
	interpolationSearchLast,
	interpolationSearchBy,
	interpolationSearchFirstBy,
	interpolationSearchLastBy,
	interpolationSearchWith,
	interpolationSearchFirstWith,
	interpolationSearchLastWith,
} = require('./interpolation')
const { sub } = require('../../operators/arithmetic/sub')
const { createTests, createByTests, createWithTests } = require('./testing/test-cases-for-search')

createTests("array.interpolationSearch", interpolationSearch, 'left')
createTests("array.interpolationSearchFirst", interpolationSearchFirst, 'first')
createTests("array.interpolationSearchLast", interpolationSearchLast, 'last')
createByTests("array.interpolationSearchBy", interpolationSearchBy, 'left')
createByTests("array.interpolationSearchFirstBy", interpolationSearchFirstBy, 'first')
createByTests("array.interpolationSearchLastBy", interpolationSearchLastBy, 'last')
createWithTests("array.interpolationSearchWith", interpolationSearchWith, 'left')
createWithTests("array.interpolationSearchFirstWith", interpolationSearchFirstWith, 'first')
createWithTests("array.interpolationSearchLastWith", interpolationSearchLastWith, 'last')

test("array.__interpolationSearch.empty-range", (t) => {
	t.equal(__interpolationSearch([ -2, 0, 2, 3 ], 4, 4, 3, sub), 4)
	t.equal(__interpolationSearch([ -2, 0, 2, 3 ], 2, 2, 0, sub), 2)
})
