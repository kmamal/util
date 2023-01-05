const { run } = require('../../../testing/speedtest')

const { __insertionsort } = require('../insertionsort')
const { __shellsort } = require('../shellsort')
const { __binsertionsort } = require('../binsertionsort')
const { __heapsort } = require('../heapsort')
const { __mergesort } = require('../mergesort')
const { __quicksort } = require('../quicksort')
const { __introsort } = require('../introsort')
const { __timsort } = require('../timsort')
const { __radixsort } = require('../radixsort')

const { reverse } = require('../../reverse')
const { swap } = require('../../swap')
const { fill } = require('../../fill')
const { map } = require('../../map')
const { randInt } = require('../../../random/rand-int')
const { shuffle } = require('../../../random/shuffle')
const { sub } = require('../../../operators/arithmetic/sub')
const { identity } = require('../../../function/identity')

const description = {
	parameters: {
		n: {
			name: "Array size",
			values: [
				10,
				100,
				1000,
				10000,
				// 100000,
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
				// 		const num = Math.log(length)
				// 		for (let i = 0; i < num; i++) {
				// 			swap.$$$(randInt(0, length), randInt(0, length))
				// 		}
				// 	},
				// },
				// {
				// 	name: "mostly reversed",
				// 	value: (arr) => {
				// 		reverse.$$$(arr)
				// 		const { length } = arr
				// 		const num = Math.log(length)
				// 		for (let i = 0; i < num; i++) {
				// 			swap.$$$(randInt(0, length), randInt(0, length))
				// 		}
				// 	},
				// },
			],
		},
		scaleKeys: {
			name: "Key distribution",
			options: [
				{
					name: "small keys",
					value: identity,
				},
				// {
				// 	name: "large keys",
				// 	value: (arr) => map.$$$(arr, (x) => 1000 * (x + 1000000)),
				// },
				// {
				// 	name: "many duplicates",
				// 	value: (arr) => {
				// 		const max = Math.floor(Math.log(arr.length))
				// 		map.$$$(arr, (x) => x % max)
				// 	},
				// },
				// {
				// 	name: "all equal",
				// 	filter: (a) => a.permuteArray === 'sorted',
				// 	value: (arr) => fill.$$$(arr, 0),
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
				// {
				// 	name: "insertion sort",
				// 	filter: ({ n }) => n <= 1000,
				// 	value: (arr) => __insertionsort(arr, 0, 1, arr.length, sub),
				// },
				// {
				// 	name: "binary insertion sort",
				// 	filter: ({ n }) => n <= 1000,
				// 	value: (arr) => __binsertionsort(arr, 0, 1, arr.length, sub),
				// },
				// {
				// 	name: "shell sort",
				// 	value: (arr) => __shellsort(arr, 0, 1, arr.length, sub),
				// },
				// {
				// 	name: "heap sort",
				// 	value: (arr) => __heapsort(arr, 0, arr.length, sub),
				// },
				// {
				// 	name: "merge sort",
				// 	value: (arr) => __mergesort(arr, 0, arr.length, sub, 16, __insertionsort),
				// },
				// {
				// 	name: "quick sort",
				// 	value: (arr) => __quicksort(arr, 0, arr.length, sub, 16, Infinity, __insertionsort),
				// },
				// {
				// 	name: "intro sort",
				// 	value: (arr) => __introsort(arr, 0, arr.length, sub),
				// },
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
	pre: ({ n }) => new Array(n),
	callback: ({ algo, n, permuteArray, scaleKeys }, arr) => {
		for (let i = 0; i < n; i++) { arr[i] = i }
		permuteArray(arr)
		scaleKeys(arr)
		algo(arr)
	},
	time: 1e3,
}

const toCsv = (keys, record) => {
	const { length } = keys
	const values = new Array(length)
	for (let i = 0; i < length; i++) {
		const key = keys[i]
		let value = record[key]
		if (typeof value === 'string') {
			value = `"${value.replace(/"/ug, '\\"')}"`
		}
		values[i] = value
	}
	return values.join(',')
}

const main = async () => {
	let keys

	for await (const { type, message, data } of run(description)) {
		switch (type) {
			case 'warning': {
				console.error("WARN", message, data)
				break
			}
			case 'info': {
				if (!data.labels) { break }
				keys = Object.keys(data.labels)
				console.log(toCsv(keys, data.labels))
				break
			}
			case 'result': {
				console.log(toCsv(keys, data))
				break
			}
			// No default
		}
	}
}

main()
