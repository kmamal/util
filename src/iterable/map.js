const { wrapIterables } = require('./common/sync-async')

const map = (iterable, fn) => wrapIterables([ iterable ], function * _map ([ a ], emit) {
	for (;;) {
		const { value, done } = yield a
		if (done) { return }
		emit(fn(value))
	}
})

module.exports = { map }
