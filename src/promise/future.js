
class Future {
	constructor () {
		this._promise = new Promise((resolve, reject) => {
			this.resolve = resolve
			this.reject = reject
		})
	}

	promise () { return this._promise }
}

module.exports = { Future }
