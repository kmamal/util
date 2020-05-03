const endpoints = require('../array/endpoints')

const makeBisect = (update) => (arr, x, options = {}) => {
	const { length } = arr
	let low = endpoints.start(length, options.start)
	let high = endpoints.end(length, options.end)

	let result = null
	do {
		const mid = Math.floor((high - low) / 2) + low
		const value = arr[mid]
		const compared = x - value

		;[ result, low, high ] = update(low, high, mid, compared)
		if (result !== null) { return result }
	} while (low < high)

	return low
}

const makeBisectBy = (update) => (arr, x, fn, options = {}) => {
	const { length } = arr
	let low = endpoints.start(length, options.start)
	let high = endpoints.end(length, options.end)

	let result = null
	do {
		const mid = Math.floor((high - low) / 2) + low
		const value = arr[mid]
		const compared = fn(x) - fn(value)

		;[ result, low, high ] = update(low, high, mid, compared)
		if (result !== null) { return result }
	} while (low < high)

	return low
}

const makeBisectWith = (update) => (arr, x, compare, options = {}) => {
	const { length } = arr
	let low = endpoints.start(length, options.start)
	let high = endpoints.end(length, options.end)

	let result = null
	do {
		const mid = Math.floor((high - low) / 2) + low
		const value = arr[mid]
		const compared = compare(x, value)

  ;[ result, low, high ] = update(low, high, mid, compared)
		if (result !== null) { return result }
	} while (low < high)

	return low
}

const baseMaker = (low, high, mid, compared) => false
  || (compared > 0 && [ null, mid + 1, high ])
  || (compared < 0 && [ null, low, mid ])
  || [ mid ]

const leftMaker = (low, high, mid, compared) => compared > 0
	? [ null, mid + 1, high ]
	: [ null, low, mid ]

const rightMaker = (low, high, mid, compared) => compared >= 0
	? [ null, mid + 1, high ]
	: [ null, low, mid ]

const bisect = makeBisect(baseMaker)
const bisectLeft = makeBisect(leftMaker)
const bisectRight = makeBisect(rightMaker)

const bisectBy = makeBisectBy(baseMaker)
const bisectLeftBy = makeBisectBy(leftMaker)
const bisectRightBy = makeBisectBy(rightMaker)

const bisectWith = makeBisectWith(baseMaker)
const bisectLeftWith = makeBisectWith(leftMaker)
const bisectRightWith = makeBisectWith(rightMaker)

module.exports = {
	bisect,
	bisectLeft,
	bisectRight,
	bisectBy,
	bisectLeftBy,
	bisectRightBy,
	bisectWith,
	bisectLeftWith,
	bisectRightWith,
}
