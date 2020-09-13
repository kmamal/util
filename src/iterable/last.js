const { wrapIterables } = require('./common/sync-async')

const last = (iterable) => wrapIterables([ iterable ], function * _last ([ a ], emit) {
	let result
	let has_values = false
	for (;;) {
		const { value, done } = yield a
		if (done) { break }
		has_values = true
		result = value
	}
	has_values && emit(result)
})

module.exports = { last }
