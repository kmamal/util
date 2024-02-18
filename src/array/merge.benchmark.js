const { benchmark } = require('@kmamal/benchmarking')
const { __merge, __mergeGalloping } = require('./merge')
const { compare } = require('../function/compare')

benchmark("array :: merge", {
	pre: () => [
		new Array(2000),
		Array.from({ length: 1000 }, Math.random).toSorted(),
		Array.from({ length: 1000 }, Math.random).toSorted(),
	],
	cases: {
		__merge: ([ dst, a, b ]) => {
			__merge(dst, 0, a, 0, 1000, b, 0, 1000, compare)
		},
		__mergeGalloping: ([ dst, a, b ]) => {
			__mergeGalloping(dst, 0, a, 0, 1000, b, 0, 1000, compare)
		},
	},
	time: 1e3,
})
