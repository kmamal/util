
const timeout = (time, info) => new Promise((resolve, reject) => {
	setTimeout(() => {
		const error = new Error("timeout")
		Object.assign(error, info)
		reject(error)
	}, time)
})

module.exports = { timeout }
