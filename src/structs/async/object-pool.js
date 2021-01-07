
class ObjectPool {
	constructor () {
		this._objects = []
		this._queue = []
	}

	release (x) {
		if (this._queue.length > 0) {
			const resolve = this._queue.shift()
			resolve(x)
			return
		}

		this._objects.push(x)
	}

	async reserve () {
		return await new Promise((resolve) => {
			if (this._objects.length > 0) {
				resolve(this._objects.pop())
				return
			}

			this._queue.push(resolve)
		})
	}
}

module.exports = { ObjectPool }
