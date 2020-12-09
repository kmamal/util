// NOTE: Must be run with `--expose-gc`

const { run } = require('../../../misc/speedtest')

const { __linearSearch } = require('../linear')
const { __binarySearch } = require('../binary')
const { __interpolationSearch } = require('../interpolation')

const { fromFactory } = require('../../from-factory')
const { identity } = require('../../../function/identity')
const { rand } = require('../../../random/rand')

const description = {
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
					name: "linear search",
					value: (arr, x, get) => {
						__linearSearch(arr, 0, arr.length, (y) => x === get(y))
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
			],
		},
	},
	pre: ({ n, funcs }) => fromFactory(n, funcs.map),
	callback: ({ algo, n, funcs }, arr) => {
		const x = funcs.get(arr[rand(n)])
		algo(arr, x, funcs.get)
	},
	time: 1e2,
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

	for await (const { type, data } of run(description)) {
		switch (type) {
			case 'warning': {
				console.error("WARN", data)
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
