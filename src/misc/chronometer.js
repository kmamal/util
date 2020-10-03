
const chronometer = (callback) => {
	const start = Date.now()
	callback()
	return Date.now() - start
}

module.exports = { chronometer }
