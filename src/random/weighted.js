const { uniform } = require('./uniform')
const { __binarySearch } = require('../array/searching/binary')
const { prefixSums, prefixSumsBy } = require('../array/prefix-sums')
const { compareBy, strictLess } = require('../function/compare')
const { sub } = require('../operators/arithmetic/sub')


const prefixSumsByTo = prefixSumsBy.to
const prefixSumsTo = prefixSums.to
const _tmp = []


const __chooseFromPrefixSums = (arr, start, end, fnCmp, options) => {
	const length = end - start
	if (length === 0) { return -1 }

	const getRandom = options?.random ?? uniform

	const total = arr[end - 1]
	const r = getRandom() * total
	return __binarySearch(arr, start, end, r, strictLess(fnCmp))
}

const chooseFromPrefixSumsWith = (arr, fnCmp, options) => __chooseFromPrefixSums(arr, 0, arr.length, fnCmp, options)

const chooseFromPrefixSumsBy = (arr, fnMap, options) => __chooseFromPrefixSums(arr, 0, arr.length, compareBy(fnMap), options)

const chooseFromPrefixSums = (arr, options) => __chooseFromPrefixSums(arr, 0, arr.length, sub, options)


const chooseFromWeights = (arr) => {
	prefixSumsTo(_tmp, arr)
	return __chooseFromPrefixSums(_tmp, 0, arr.length, sub)
}


const chooseWeightedBy = (arr, fnMap) => {
	prefixSumsByTo(_tmp, arr, fnMap)
	const index = __chooseFromPrefixSums(_tmp, 0, arr.length, sub)
	return arr[index]
}


module.exports = {
	__chooseFromPrefixSums,
	chooseFromPrefixSumsWith,
	chooseFromPrefixSumsBy,
	chooseFromPrefixSums,
	chooseFromWeights,
	chooseWeightedBy,
}
