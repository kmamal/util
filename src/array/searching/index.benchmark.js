const { benchmark } = require('@kmamal/benchmarking')

const { __linearSearch } = require('./linear')
const { __binarySearch } = require('./binary')
const { __interpolationSearch } = require('./interpolation')
const { __exponentialSearch } = require('./exponential')

const { create } = require('../create')
const { identity } = require('../../function/identity')
const { rand } = require('../../random/rand')

benchmark.complex("array :: search algorithms", {
	parameters: {
		n: {
			name: "Array size",
			values: [
				4,
				8,
				16,
				64,
				256,
				1024,
				1024 * 1024,
			],
		},
		funcs: {
			name: "Array structure",
			options: [
				{
					name: "flat",
					value: {
						map: identity,
						get: identity,
					},
				},
				{
					name: "objects",
					value: {
						map: (x) => ({ x }),
						get: ({ x }) => x,
					},
				},
			],
		},
		algo: {
			name: "Algorithm",
			options: [
				{
					name: "builtin (indexOf)",
					value: (arr, x) => {
						arr.indexOf(x)
					},
					filter: ({ funcs }) => funcs === 'flat',
				},
				{
					name: "builtin (find)",
					value: (arr, x, get) => {
						arr.find((y) => x === get(y))
					},
					filter: ({ funcs }) => funcs === 'objects',
				},
				{
					name: "linear search",
					value: (arr, x, get) => {
						__linearSearch(arr, 0, arr.length, x, (y) => x === get(y))
					},
				},
				{
					name: "binary search",
					value: (arr, x, get) => {
						__binarySearch(arr, 0, arr.length, x, (_, y) => x - get(y))
					},
				},
				{
					name: "interpolation search",
					value: (arr, x, get) => {
						__interpolationSearch(arr, 0, arr.length, x, (_, y) => x - get(y))
					},
				},
				{
					name: "exponential search",
					value: (arr, x, get) => {
						__exponentialSearch(arr, 0, arr.length - 1, x, (_, y) => x - get(y))
					},
				},
			],
		},
	},
	pre: ({ n, funcs }) => create(n, funcs.map),
	callback: ({ algo, n, funcs }, arr) => {
		const x = funcs.get(arr[rand(n)])
		algo(arr, x, funcs.get)
	},
	time: 1e2,
})
