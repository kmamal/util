const { Deque } = require('../deque')

const k_key = Symbol("key")

class Lru {
	constructor (capacity) {
		this._capacity = capacity
		this._list = new Deque()
		this._map = new Map()
	}

	get size () { return this._map.size }

	has (key) {
		return this._map.has(key)
	}

	get (key) {
		return this._getEntry(key)?.value
	}

	set (key, value) {
		let entry = this._getEntry(key)
		if (entry) {
			const old_value = entry.value
			entry.value = value
			return old_value
		}

		entry = this._list.unshift(value)
		entry[k_key] = key
		this._map.set(key, entry)

		if (this._list.size() > this._capacity) {
			entry = this._list._pop()
			this._map.delete(entry[k_key])
		}

		return undefined
	}

	delete (key) {
		const entry = this._map.get(key)
		if (!entry) { return undefined }
		this._list.remove(entry)
		this._map.delete(key)
		return entry.value
	}

	_getEntry (key) {
		const entry = this._map.get(key)
		if (!entry) { return undefined }
		this._list.remove(entry)
		this._list._unshift(entry)
		return entry
	}
}

module.exports = { Lru }
