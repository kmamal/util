const { map } = require('../../array/map')

const wrapIterables = (iterables, fn) => {
	let someAsync = false
	const iterators = map(iterables, (iterable) => {
		const generator = iterable[Symbol.iterator] || iterable[Symbol.asyncIterator]
		const isAsync = generator === iterable[Symbol.asyncIterator]
		if (isAsync) { someAsync = true }
		const iterator = generator.call(iterable)
		return { iterator, isAsync }
	})

	const emitted = []
	const emit = (value) => { emitted.push(value) }
	const fnIterator = fn(iterators, emit)

	let key
	let next
	let entry
	if (someAsync) {
		key = Symbol.asyncIterator
		next = async () => {
			let pulled
			while (emitted.length === 0) {
				if (entry) {
					pulled = entry.iterator.next()
					if (entry.isAsync) { pulled = await pulled }
					entry = null
				}

				const { value, done } = fnIterator.next(pulled)
				if (done) { break }
				entry = value
			}
			return {
				done: emitted.length === 0,
				value: emitted.shift(),
			}
		}
	} else {
		key = Symbol.iterator
		next = () => {
			let pulled
			while (emitted.length === 0) {
				if (entry) {
					pulled = entry.iterator.next()
					entry = null
				}
				const { value, done } = fnIterator.next(pulled)
				if (done) { break }
				entry = value
			}
			return {
				done: emitted.length === 0,
				value: emitted.shift(),
			}
		}
	}

	return { [key] () { return { next } } }
}

const runSync = (iterator) => {
	let value
	for (;;) {
		const result = iterator.next(value)
		if (typeof result.then === 'function') { return runAsync(iterator, result) }
		value = result.value
	}
}

const runAsync = async (iterator, promise) => {
	let result = await promise
	for (;;) {
		const { value, done } = iterator.next(result)
		if (done) { break }
		result = value
	}
	return result
}

const wrapFunction = (generator) => (...args) => {
	const iterator = generator(...args)
	return runSync(iterator)
}

module.exports = {
	wrapIterables,
	wrapFunction,
}
