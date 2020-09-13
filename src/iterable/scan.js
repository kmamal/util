const { wrapIterables } = require('./common/sync-async')

const scan = (iterable, fn, init) => wrapIterables([ iterable ], function * _scan ([ a ], emit) {
	let acc = init
	let initialized_acc = acc !== undefined

	for (;;) {
		const { value, done } = yield a
		if (done) { return }
		if (!initialized_acc) {
			initialized_acc = true
			acc = value
		} else {
			acc = fn(acc, value)
		}

		emit(acc)
	}
})

module.exports = { scan }
