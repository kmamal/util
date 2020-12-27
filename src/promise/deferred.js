const { Future } = require('@xyz/util/promise/future')

class Deferred {
	constructor (callback) {
		this._callback = callback
		this._future = new Future()
		this._state = Deferred.State.NEW
		this._result = null
	}

	state () { return this._state }

	async get () {
		if (this._state === Deferred.State.NEW) { this.produce() }
		await this._future.promise()
		return this._result
	}

	async produce () {
		if (this._state !== Deferred.State.NEW) { return }

		this._state = Deferred.State.PRODUCING
		this._result = await this._callback()
		this._state = Deferred.State.PRODUCED
		this._future.resolve()
	}

	static State = {
		NEW: 0,
		PRODUCING: 0,
		PRODUCED: 0,
	}

	static produce (result) {
		const deferred = new Deferred()
		deferred._result = result
		deferred._state = Deferred.State.PRODUCED
		return deferred
	}
}

module.exports = { Deferred }
