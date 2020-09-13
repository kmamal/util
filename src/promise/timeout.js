
const timeout = (time) => new Promise((resolve, reject) => {
	setTimeout(() => {
		reject(new Error("timeout"))
	}, time)
})

module.exports = { timeout }
