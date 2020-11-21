const { Deque } = require('./deque')

const k_key = Symbol("key")
const k_time = Symbol("time")

class Age {
	constructor (lifetime, eager = true) {
		this._lifetime = lifetime
		this._eager = eager
		this._list = new Deque()
		this._map = new Map()
	}

	has (key) {
		return this._map.has(key)
	}

	_getEntry (key, now = Date.now()) {
		let entry = this._map.get(key)
		if (!entry) { return null }

		const elapsed = now - entry[k_time]
		const remaining = this._lifetime - elapsed
		if (remaining > 0) {
			this._list.remove(entry)
			this._list._unshift(entry)
			return entry
		}

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
}

module.exports = { Age }
