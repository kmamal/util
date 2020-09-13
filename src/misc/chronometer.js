
const chronometer = (callback) => {
	const S = Date.now()
	callback()
	return Date.now() - S
}

module.exports = { chronometer }
