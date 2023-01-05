const { __mergeInplace } = require('../merge')
const { __insertionsort } = require('./insertionsort')
const { compare, compareBy } = require('../../function/compare')
const { clone } = require('../clone')

const INSERTION_SORT_CUTOFF = 16

const __recurse = (arr, start, end, buffer, fnCmp, cutoff, takeover) => {
	const length = end - start
	if (length <= 1) { return }
	if (length <= cutoff) {
		takeover(arr, start, start + 1, end, fnCmp)
		return
	}

	const mid = start + Math.floor(length / 2)
	__recurse(arr, start, mid, buffer, fnCmp, cutoff, takeover)
	__recurse(arr, mid, end, buffer, fnCmp, cutoff, takeover)
	__mergeInplace(arr, start, mid, end, buffer, fnCmp)
}

const __mergesort = (arr, start, end, fnCmp, cutoff, takeover) => {
	const buffer = new Array(Math.floor((end - start) / 2))
	__recurse(arr, start, end, buffer, fnCmp, cutoff, takeover)
}

const mergesortWith$$$ = (arr, fnCmp) => {
	if (arr.length > 1) {
		__mergesort(arr, 0, arr.length, fnCmp, INSERTION_SORT_CUTOFF, __insertionsort)
	}
	return arr
}

const mergesortWith = (arr, fnCmp) => mergesortWith$$$(clone(arr), fnCmp)

mergesortWith.$$$ = mergesortWith$$$

const mergesortBy$$$ = (arr, fnMap) => mergesortWith$$$(arr, compareBy(fnMap))

const mergesortBy = (arr, fnMap) => mergesortWith(arr, compareBy(fnMap))

mergesortBy.$$$ = mergesortBy$$$

const mergesort$$$ = (arr) => mergesortWith$$$(arr, compare)

const mergesort = (arr) => mergesortWith(arr, compare)

mergesort.$$$ = mergesort$$$

module.exports = {
	__mergesort,
	mergesortWith,
	mergesortBy,
	mergesort,
}
