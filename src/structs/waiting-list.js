
class WaitingList {
	constructor () {
		this._stack = []
		this._queue = []
	}

	release (x) {
		if (this._queue.length > 0) {
			this._queue.shift()(x)
			return
		}

		this._stack.push(x)
	}

	reserve () {
		return new Promise((resolve) => {
			if (this._stack.length > 0) {
				resolve(this._stack.pop())
				return
			}

			this._queue.push(resolve)
		})
	}
}

module.exports = { WaitingList }
