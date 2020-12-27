const { Future } = require('@xyz/util/promise/future')

class Deferred {
	constructor (callback) {
		this._callback = callback
		this._future = new Future()
		this._state = Deferred.State.NEW
	}

	state () { return this._state }

	async get () {
		if (this._state === Deferred.State.NEW) { this.produce() }
		const result = await this._future.promise()
		return result
	}

	async produce () {
		if (this._state !== Deferred.State.NEW) { return }

		this._state = Deferred.State.PRODUCING
		const result = await this._callback()
		this._state = Deferred.State.PRODUCED
		this._future.resolve(result)
	}

	static State = {
		NEW: 'new',
		PRODUCING: 'producing',
		PRODUCED: 'produced',
	}

	static produce (result) {
		const deferred = new Deferred()
		deferred._future.resolve(result)
		deferred._state = Deferred.State.PRODUCED
		return deferred
	}
}

module.exports = { Deferred }
