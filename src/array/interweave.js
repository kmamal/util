const { mergeWith } = require('./merge')

let _state
const _alternate = () => (_state *= -1)

const interweave = (a, b) => {
	_state = 1
	return mergeWith(a, b, _alternate)
}

module.exports = { interweave }
