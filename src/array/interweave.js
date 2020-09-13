const { mergeWith } = require('./merge')

let state
const alternate = () => (state *= -1)

const interweave = (a, b) => {
	state = 1
	return mergeWith(a, b, alternate)
}

module.exports = { interweave }
