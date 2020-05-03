const Core = require('./core')
const Extra = require('./extra')

module.exports = {
	initial: Core.pop,
	tail: Core.shift,
	unzip: Extra.zip,
}
