const { wrapIterables } = require('./common/sync-async')

const filter = (iterable, fn) => wrapIterables([ iterable ], function * _filter ([ a ], emit) {
	for (;;) {
		const { value, done } = yield a
		if (done) { return }
		const should_emit = fn(value)
		should_emit && emit(value)
	}
})

module.exports = { filter }
