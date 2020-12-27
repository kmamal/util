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
		const value = await this._future.promise()
		return value
	}

	set (value) {
		if (this._state !== Deferred.State.NEW) {
			const error = new Error("invalid state")
			error.state = this._state
			error.value = this._value
			throw error
		}

		this._state = Deferred.State.PRODUCED
		this._future.resolve(value)
	}

	async produce () {
		if (this._state !== Deferred.State.NEW) {
			const error = new Error("invalid state")
			error.state = this._state
			throw error
		}

		this._state = Deferred.State.PRODUCING
		const value = await this._callback()
		this._state = Deferred.State.PRODUCED
		this._future.resolve(value)
	}

	static State = {
		NEW: 'new',
		PRODUCING: 'producing',
		PRODUCED: 'produced',
	}

	static set (value) {
		const deferred = new Deferred()
		deferred.set(value)
		return deferred
	}
}

module.exports = { Deferred }
