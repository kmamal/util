const { filter, reduce, sort } = require('./core')
const { iteratee } = require('../util')
const { add } = require('../operators')

const chunk = (n) => (arr) => {
	const num_chunks = Math.ceil(arr.length / n)
	const chunks = Array(num_chunks)
	let chunks_index = 0

	let buffer
	let buffer_index = 0

	for (const x of arr) {
		if (buffer_index === n) {
			chunks[chunks_index] = buffer
			chunks_index += 1

			buffer = Array(n)
			buffer_index = 0
		}

		buffer[buffer_index] = x
		buffer_index += 1
	}

	if (buffer_index) {
		chunks[chunks_index] = buffer.slice(0, buffer_index)
	}

	return chunks
}

const comm = (_a, _b) => {
	const a = sortedUniq(_a)
	const b = sortedUniq(_b)
	const only_a = []
	const both = []
	const only_b = []

	let ai = 0
	let bi = 0
	while (ai < a.length || bi < b.length) {
		const x = a[ai]
		const y = b[bi]
		if (x < y) {
			only_a.push(a)
			ai += 1
		} else if (x === y) {
			both.push(x)
			ai += 1
			bi += 1
		} else {
			only_b.push(x)
			bi += 1
		}
	}

	return {
		a: only_a,
		both,
		b: only_b,
	}
}

const compact = filter(Boolean)

const cycle = (n) => (arr) => {
	const result = Array(n)
	let index = 0

	const { length } = arr
	const full_loops = Math.floor(n / length)
	const remainder = n % length

	for (let j = 0; j < full_loops; j++) {
		for (let i = 0; i < length; i++) {
			result[index] = arr[i]
			index += 1
		}
	}

	for (let i = 0; i < remainder; i++) {
		result[index] = arr[i]
		index += 1
	}

	return result
}

const cycleFrom = (arr) => (n) => cycle(n)(arr)

const findIndex = (fn) => {
	const iter = iteratee(fn)
	return (arr) => {
		for (let i = 0; i < arr.length; i++) {
			const x = arr[i]
			if (iter(x)) { return i }
		}
		return -1
	}
}

const findLastIndex = (fn) => {
	const iter = iteratee(fn)
	return (arr) => {
		for (let i = arr.length - 1; i >= 0; i--) {
			const x = arr[i]
			if (iter(x)) { return i }
		}
		return -1
	}
}

const first = (arr) => arr[0]

const interpose = (x) => (arr) => {
	const { length } = arr
	const result = Array(length * 2 - 1)
	result[0] = arr[0]
	let index = 1
	for (let i = 1; i < length; i++) {
		result[index] = x
		index += 1
		result[index] = arr[i]
		index += 1
	}
	return result
}

const interposeFor = (arr) => (x) => interpose(x)(arr)

const interweave = (a, b, _length) => {
	const getA = typeof a === 'function' ? (i) => a(i) : (i) => a[i]
	const getB = typeof b === 'function' ? (i) => b(i) : (i) => b[i]
	const length = a.length || b.length || _length
	return Array.from({ length: length * 2 - 1 }, (_, i) => i % 2 === 0 ? getA(i / 2) : getB((i - 1) / 2))
}

const intersect = (_a) => {
	const a = uniq(_a)
	return (_b) => {
		const b = uniq(_b)
		const result = []
		for (const x of a) {
			for (const y of b) {
				if (x === y) {
					result.push(x)
					break
				}
			}
		}
		return result
	}
}

const intersectBy = (_a, fn) => {
	const a = uniq(_a)
	const iter = iteratee(fn)
	return (_b) => {
		const iter_b = uniq(_b).map(iter)
		const result = []
		for (const x of a) {
			const iter_x = iter(x)
			for (const iter_y of iter_b) {
				if (iter_x === iter_y) {
					result.push(x)
					break
				}
			}
		}
		return result
	}
}

const intersectWith = (_a, comparator) => {
	const a = uniq(_a)
	return (_b) => {
		const b = uniq(_b)
		const result = []
		for (const x of a) {
			for (const y of b) {
				if (comparator(x, y)) {
					result.push(x)
					break
				}
			}
		}
		return result
	}
}

const intersectFrom = (a) => (b) => intersect(b)(a)
const intersectFromBy = (a, fn) => (b) => intersectBy(b, fn)(a)
const intersectFromWith = (a, fn) => (b) => intersectWith(b, fn)(a)

const last = (arr) => arr[arr.length - 1]

const nth = (n) => (arr) => arr[n < 0 ? arr.length + n : n]

const max = reduce(Math.max)

const maxBy = (fn) => {
	const iter = iteratee(fn)
	return (arr) => arr.reduce((best, x) => {
		const x_score = iter(x)
		return x_score >= best.score ? { value: x, score: x_score } : best
	}, { score: -Infinity }).value
}

const min = reduce(Math.min)

const minBy = (fn) => {
	const iter = iteratee(fn)
	return (arr) => arr.reduce((best, x) => {
		const x_score = iter(x)
		return x_score <= best.score ? { value: x, score: x_score } : best
	}, { score: Infinity }).value
}

const reject = (fn) => {
	const iter = iteratee(fn)
	return (arr) => arr.filter((x) => !iter(x))
}

const repeat = (n) => (x) => Array(n).fill(x)

const scan = (fn) => {
	const iter = iteratee(fn)
	return (arr) => {
		const { length } = arr
		const res = Array(length)
		res[0] = arr[0]
		for (let i = 1; i < length; i++) {
			res[i] = iter(res[i - 1], arr[i])
		}
		return res
	}
}

const scanRight = (fn) => {
	const iter = iteratee(fn)
	return (arr) => {
		const { length } = arr
		const res = Array(length)
		const last_index = length - 1
		res[last_index] = arr[last_index]
		for (let i = last_index - 1; i >= 0; i--) {
			res[i] = iter(res[i + 1], arr[i])
		}
		return res
	}
}

const sortBy = (fn) => {
	const iter = iteratee(fn)
	const comparator = (a, b) => iter(a) < iter(b)
	return sort(comparator)
}

const sortedUniq = (arr) => {
	const { length } = arr
	if (length === 0) { return [] }

	const result = Array(length)
	result.push(arr[0])
	let last_index = 0
	for (let i = 0; i < length; i++) {
		const x = arr[i]
		if (x === result[last_index]) { continue }
		last_index += 1
		result[last_index] = x
	}
	return result.slice(0, last_index + 1)
}

const subtract = (_a) => {
	const a = uniq(_a)
	return (_b) => {
		const b = uniq(_b)
		const result = []
		each_x:
		for (const x of a) {
			for (const y of b) {
				if (x === y) { break each_x }
			}
			result.push(x)
		}
		return result
	}
}

const subtractBy = (_a, fn) => {
	const a = uniq(_a)
	const iter = iteratee(fn)
	return (_b) => {
		const iter_b = uniq(_b).map(iter)
		const result = []
		each_x:
		for (const x of a) {
			const iter_x = iter(x)
			for (const iter_y of iter_b) {
				if (iter_x === iter_y) { break each_x }
			}
			result.push(x)
		}
		return result
	}
}

const subtractWith = (_a, comparator) => {
	const a = uniq(_a)
	return (_b) => {
		const b = uniq(_b)
		const result = []
		each_x:
		for (const x of a) {
			for (const y of b) {
				if (comparator(x, y)) { break each_x }
			}
			result.push(x)
		}
		return result
	}
}

const subtractFrom = (a) => (b) => subtract(b)(a)
const subtractFromBy = (a, fn) => (b) => subtractBy(b, fn)(a)
const subtractFromWith = (a, fn) => (b) => subtractWith(b, fn)(a)

const sum = reduce(add)

const sumBy = (fn) => {
	const iter = iteratee(fn)
	return reduce((total, x) => total + iter(x))
}

const times = (n) => (fn) => {
	const result = Array(n)
	for (let i = 0; i < n; i++) {
		result[i] = fn(i)
	}
	return result
}

const timesFor = (fn) => (n) => times(n)(fn)

const uniq = (arr) => {
	const result = Array(arr.length)
	let index = 0
	each_x:
	for (let i = 0; i < arr.length; i++) {
		const x = arr[i]
		for (let j = 0; j < i; j++) {
			const y = arr[j]
			if (x === y) { continue each_x }
		}
		result[index] = x
		index += 1
	}
	return result.slice(0, index)
}

const xor = (_a, _b) => {
	const a = uniq(_a)
	const b = uniq(_b)
	const result = []

	each_x:
	for (const x of a) {
		for (const y of b) {
			if (x === y) { break each_x }
		}
		result.push(x)
	}

	each_y:
	for (const y of b) {
		for (const x of a) {
			if (x === y) { break each_y }
		}
		result.push(y)
	}

	return result
}

const zip = (arrays) => {
	const { length: width } = arrays
	const length = maxBy('length')(arrays).length
	const res = Array(length)
	for (let i = 0; i < length; i++) {
		const tuple = Array(width)
		for (let j = 0; j < width; j++) {
			tuple[j] = arrays[j][i]
		}
		res[i] = tuple
	}
	return res
}

const prefixSums = scan(add)

module.exports = {
	chunk,
	comm,
	compact,
	cycle,
	cycleFrom,
	findIndex,
	findLastIndex,
	first,
	intersect,
	intersectBy,
	intersectWith,
	intersectFrom,
	intersectFromBy,
	intersectFromWith,
	last,
	nth,
	max,
	maxBy,
	min,
	minBy,
	prefixSums,
	reject,
	repeat,
	scan,
	scanRight,
	sortBy,
	subtract,
	subtractBy,
	subtractWith,
	subtractFrom,
	subtractFromBy,
	subtractFromWith,
	sum,
	sumBy,
	times,
	timesFor,
	uniq,
	// weave,
	// weaveFor,
	xor,
	zip,
}
