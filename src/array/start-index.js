
const startIndex = (length, index) => index === undefined ? 0
	: index < 0 ? length + index
	: index

module.exports = { startIndex }
