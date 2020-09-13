const { wrapIterables } = require('./common/sync-async')

const zip = (iterables) => wrapIterables(iterables, function * _zip (sources, emit) {
	const { length } = sources
	for (;;) {
		const zipped = Array(length)
		let all_done = true
		for (let i = 0; i < length; i++) {
			const { value, done } = yield sources[i]
			if (!done) { all_done = false }
			zipped[i] = value
		}
		if (all_done) { return }
		emit(zipped)
	}
})

module.exports = { zip }
