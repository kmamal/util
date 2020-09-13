const { wrapFunction } = require('./common/sync-async')

const pump = wrapFunction(function * _pump (iterable) {
	const generator = iterable[Symbol.iterator] || iterable[Symbol.asyncIterator]
	const iterator = generator.call(iterable)
	for (;;) {
		const { done } = yield iterator.next()
		if (done) { return }
	}
})

module.exports = { pump }
