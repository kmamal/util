const { wrapIterables } = require('./common/sync-async')

const concat = (iterables) => wrapIterables(iterables, function * _concat (a, emit) {
	for (const iterable of a) {
		for (;;) {
			const { value, done } = yield iterable
			if (done) { break }
			emit(value)
		}
	}
})

module.exports = { concat }
