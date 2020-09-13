const { random } = require('../random')
const { rand } = require('../rand')
const { identity } = require('../../function/identity')

const getIndex = (x, i) => i

const __sampleReservoir1 = async (dst, dst_start, iterable, n, selector, options) => {
	let index = 0
	let write_index = dst_start
	const dst_end = dst_start + n

	const iterator = iterable[Symbol.asyncIterator](iterable)
	while (write_index < dst_end) {
		const { value, done } = await iterator.next()
		if (done) { return write_index - dst_start }
		dst[write_index++] = selector(value, index++)
	}

	for (;;) {
		const { value, done } = await iterator.next()
		if (done) { return n }
		const r = rand(index + 1, options)
		if (r < n) {
			dst[dst_start + r] = selector(value, index)
		}
		index += 1
	}
}

const __sampleReservoir2 = async (dst, dst_start, iterable, n, selector, options) => {
	let index = 0
	let write_index = dst_start
	const dst_end = dst_start + n

	const iterator = iterable[Symbol.asyncIterator](iterable)
	while (write_index < dst_end) {
		const { value, done } = await iterator.next()
		if (done) { return write_index - dst_start }
		dst[write_index++] = selector(value, index++)
	}

	const getRandom = options ? options.random : random
	let W = Math.exp(Math.log(getRandom()) / n)

	for (;;) {
		const next_index = index + Math.floor(Math.log(getRandom()) / Math.log(1 - W)) + 1
		while (index < next_index) {
			const { done } = await iterator.next()
			if (done) { return n }
			index += 1
		}

		const { value, done } = await iterator.next()
		if (done) { return n }
		index += 1

		dst[dst_start + rand(n, options)] = selector(value, index)
		W *= Math.exp(Math.log(getRandom()) / n)
	}
}

const sampleIndexesFromReservoir = async (iterable, n) => {
	const res = Array(n)
	const m = await __sampleReservoir1(res, 0, iterable, n, getIndex)
	res.length = m
	return res
}

const sampleValuesFromReservoir = async (iterable, n) => {
	const res = Array(n)
	const m = await __sampleReservoir1(res, 0, iterable, n, identity)
	res.length = m
	return res
}

module.exports = {
	__sampleReservoir1,
	__sampleReservoir2,
	sampleIndexesFromReservoir,
	sampleValuesFromReservoir,
}
