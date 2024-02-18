const { benchmark } = require('@kmamal/benchmarking')

const { __insertionsort } = require('./insertionsort')
const { __shellsort } = require('./shellsort')
const { __binsertionsort } = require('./binsertionsort')
const { __heapsort } = require('./heapsort')
const { __mergesort } = require('./mergesort')
const { __quicksort } = require('./quicksort')
const { __introsort } = require('./introsort')
const { __timsort } = require('./timsort')
const { __radixsort } = require('./radixsort')

const { reverse } = require('../reverse')
const { swap } = require('../swap')
const { map } = require('../map')
const { randInt } = require('../../random/rand-int')
const { shuffle } = require('../../random/shuffle')
const { sub } = require('../../operators/arithmetic/sub')
const { identity } = require('../../function/identity')

benchmark.complex("array :: sorting algorithms", {
	parameters: {
		n: {
			name: "Array size",
			values: [
				10,
				100,
				1000,
				10000,
				100000,
				// 1000000,
			],
		},
		permuteArray: {
			name: "Array structure",
			options: [
				{
					name: "random",
					value: shuffle.$$$,
				},
				// {
				// 	name: "sorted",
				// 	value: identity,
				// },
				// {
				// 	name: "reversed",
				// 	value: reverse.$$$,
				// },
				// {
				// 	name: "mostly sorted",
				// 	value: (arr) => {
				// 		const { length } = arr
				// 		const num = Math.max(1, Math.log(length))
				// 		for (let i = 0; i < num; i++) {
				// 			swap.$$$(arr, randInt(0, length), randInt(0, length))
				// 		}
				// 	},
				// },
				// {
				// 	name: "mostly reversed",
				// 	value: (arr) => {
				// 		reverse.$$$(arr)
				// 		const { length } = arr
				// 		const num = Math.max(1, Math.log(length))
				// 		for (let i = 0; i < num; i++) {
				// 			swap.$$$(arr, randInt(0, length), randInt(0, length))
				// 		}
				// 	},
				// },
			],
		},
		distributeKeys: {
			name: "Key distribution",
			options: [
				{
					name: "all unique",
					value: identity,
				},
				// {
				// 	name: "some duplicates",
				// 	value: (arr) => {
				// 		map.$$$(arr, (x) => Math.floor(Math.sqrt(x)))
				// 	},
				// },
				// {
				// 	name: "many duplicates",
				// 	value: (arr) => {
				// 		map.$$$(arr, (x) => Math.floor(Math.log(x)))
				// 	},
				// },
				// {
				// 	name: "all equal",
				// 	filter: (a) => a.permuteArray === 'sorted',
				// 	value: (arr) => arr.fill(1),
				// },
			],
		},
		scaleKeys: {
			name: "Key scale",
			options: [
				{
					name: "small keys",
					value: identity,
				},
				// {
				// 	name: "large keys",
				// 	value: (arr) => map.$$$(arr, (x) => x << 12),
				// },
			],
		},
		algo: {
			name: "Algorithm",
			options: [
				// {
				// 	name: "built-in sort",
				// 	value: (arr) => arr.sort(sub),
				// },
				{
					name: "insertion sort",
					// filter: ({ n }) => n <= 1000,
					value: (arr) => __insertionsort(arr, 0, 1, arr.length, sub),
				},
				// {
				// 	name: "binary insertion sort",
				// 	// filter: ({ n }) => n <= 1000,
				// 	value: (arr) => __binsertionsort(arr, 0, 1, arr.length, sub),
				// },
				{
					name: "shell sort",
					value: (arr) => __shellsort(arr, 0, 1, arr.length, sub),
				},
				{
					name: "heap sort",
					value: (arr) => __heapsort(arr, 0, arr.length, sub),
				},
				{
					name: "merge sort",
					value: (arr) => __mergesort(arr, 0, arr.length, sub, 0, __insertionsort),
				},
				{
					name: "quick sort",
					value: (arr) => __quicksort(arr, 0, arr.length, sub, 0, Infinity, __insertionsort),
				},
				{
					name: "intro sort",
					value: (arr) => __introsort(arr, 0, arr.length, sub),
				},
				{
					name: "tim sort",
					value: (arr) => __timsort(arr, 0, arr.length, sub),
				},
				// {
				// 	name: "radix sort",
				// 	value: (arr) => __radixsort(arr, 0, arr.length, new Array(arr.length), 4, identity),
				// },
			],
		},
	},
	pre: ({ n, permuteArray, distributeKeys, scaleKeys }) => {
		const arr = new Array(n)
		for (let i = 0; i < n; i++) { arr[i] = i }
		permuteArray(arr)
		distributeKeys(arr)
		scaleKeys(arr)
		return arr
	},
	callback: ({ algo }, arr) => {
		algo(Array.from(arr))
	},
	time: 1e3,
})
