const { Deque } = require('../deque')

const k_key = Symbol("key")
const k_time = Symbol("time")

class Age {
	constructor (lifetime, eager = true) {
		this._lifetime = lifetime
		this._eager = eager
		this._list = new Deque()
		this._map = new Map()
	}

	get size () { return this._map.size }

	has (key) {
		return Boolean(this._peekEntry(key))
	}

	get (key) {
		return this._getEntry(key)?.value
	}

	set (key, value) {
		const now = Date.now()

		let entry = this._getEntry(key, now)?.value
		if (entry) {
			const old_value = entry.value
			entry.value = value
			return old_value
		}

		entry = this._list.unshift(value)
		entry[k_key] = key
		entry[k_time] = now
		this._map.set(key, entry)

		return undefined
	}

	delete (key) {
		const entry = this._map.get(key)
		if (!entry) { return undefined }
		this._list.remove(entry)
		this._map.delete(key)
		return entry.value
	}

	_peekEntry (key, now = Date.now()) {
		let entry = this._map.get(key)
		if (!entry) { return null }

		const elapsed = now - entry[k_time]
		const remaining = this._lifetime - elapsed
		if (remaining > 0) { return entry }

		this._map.delete(entry[k_key])
		this._list.remove(entry)

		if (this._eager) {
			entry = entry.next
			while (entry) {
				this._map.delete(entry[k_key])
				this._list.remove(entry)
				entry = entry.next
			}
		}

		return null
	}

	_getEntry (key, now = Date.now()) {
		const entry = this._peekEntry(key, now)
		if (!entry) { return null }

		this._list.remove(entry)
		this._list._unshift(entry)
		entry[k_time] = now
		return entry
	}
}

module.exports = { Age }
