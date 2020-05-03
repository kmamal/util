const { random } = require('../random')
const { bisectLeftWith } = require('../bisect')
const { prefixSums } = require('array/prefix-sums')
const { sub } = require('../operators')

const chooseFromPrefixSums = (prefix_sums) => {
	const total = prefix_sums[prefix_sums.length]
	const r = random() * total
	return bisectLeftWith(prefix_sums, r, { compare: sub })
}

const chooseWeightedIndexBy = (arr, fn) => {
	const prefix_sums = prefixSums(arr.map(fn))
	return chooseFromPrefixSums(prefix_sums)
}

const chooseWeightedValueBy = (arr, fn) => {
	const index = chooseWeightedIndexBy(arr, fn)
	return arr[index]
}
