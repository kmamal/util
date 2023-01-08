
const endIndex = (length, index) => index === undefined ? length
	: index < 0 ? length + index
	: index

module.exports = { endIndex }
