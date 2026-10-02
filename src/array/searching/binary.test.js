const {
	binarySearch,
	binarySearchFirst,
	binarySearchLast,
	binarySearchBy,
	binarySearchFirstBy,
	binarySearchLastBy,
	binarySearchWith,
	binarySearchFirstWith,
	binarySearchLastWith,
} = require('./binary')
const { createTests, createByTests, createWithTests } = require('./testing/test-cases-for-search')

createTests("array.binarySearch", binarySearch, 'left')
createTests("array.binarySearchFirst", binarySearchFirst, 'first')
createTests("array.binarySearchLast", binarySearchLast, 'last')
createByTests("array.binarySearchBy", binarySearchBy, 'left')
createByTests("array.binarySearchFirstBy", binarySearchFirstBy, 'first')
createByTests("array.binarySearchLastBy", binarySearchLastBy, 'last')
createWithTests("array.binarySearchWith", binarySearchWith, 'left')
createWithTests("array.binarySearchFirstWith", binarySearchFirstWith, 'first')
createWithTests("array.binarySearchLastWith", binarySearchLastWith, 'last')
