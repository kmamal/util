const { iteratee } = require('../util')
const { unary, binary } = require('../../function')

const concat = (...args) => (arr) => arr.concat(...args)

const copyWithin = (target, start, end) => (arr) => Array.from(arr).copyWithin(target, start, end)

const every = (fn) => {
	const iter = unary(iteratee(fn))
	return (arr) => arr.every(iter)
}

const fill = (value, start, end) => (arr) => Array.from(arr).fill(value, start, end)

const filter = (fn) => {
	const iter = unary(iteratee(fn))
	return (arr) => arr.filter(iter)
}

const find = (fn) => {
	const iter = unary(iteratee(fn))
	return (arr) => arr.find(iter)
}

const findIndex = (fn) => {
	const iter = unary(iteratee(fn))
	return (arr) => arr.findIndex(iter)
}

const flat = (depth) => (arr) => arr.flat(depth)

const flatMap = (fn) => {
	const iter = unary(iteratee(fn))
	return (arr) => arr.flatMap(iter)
}

const forEach = (fn) => {
	const iter = unary(iteratee(fn))
	return (arr) => arr.forEach(iter)
}

const includes = (value, from) => (arr) => arr.includes(value, from)

const indexOf = (value, from) => (arr) => arr.indexOf(value, from)

const join = (sep) => (arr) => arr.join(sep)

const lastIndexOf = (value, from) => (arr) => arr.lastIndexOf(value, from)

const map = (fn) => {
	const iter = unary(iteratee(fn))
	return (arr) => arr.map(iter)
}

const pop = (arr) => arr.slice(0, -1)

const push = (value) => (arr) => [ ...arr, value ]

const reduce = (fn, acc) => {
	const iter = binary(fn)
	return (arr) => arr.reduce(iter, acc)
}

const reduceRight = (fn, acc) => {
	const iter = binary(fn)
	return (arr) => arr.reduceRight(iter, acc)
}

const reverse = (arr) => arr.reverse()

const shift = (arr) => arr.slice(1)

const slice = (start, end) => (arr) => arr.slice(start, end)

const some = (fn) => {
	const iter = unary(iteratee(fn))
	return (arr) => arr.some(iter)
}

const sort = (comp) => (arr) => Array.from(arr).sort(comp)

const splice = (index, count, ...values) => (arr) => arr.slice(index, count, ...values)

const unshift = (value) => (arr) => [ value, ...arr ]

module.exports = {
	concat,
	copyWithin,
	every,
	fill,
	filter,
	find,
	findIndex,
	flat,
	flatMap,
	forEach,
	includes,
	indexOf,
	join,
	lastIndexOf,
	map,
	pop,
	push,
	reduce,
	reduceRight,
	reverse,
	shift,
	slice,
	some,
	sort,
	splice,
	unshift,
}
