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
		const entry = this._map.get(key)
		if (!entry) { return undefined }
		this._list.remove(entry)
		this._list._unshift(entry)
		return entry.value
	}

	set (key, value) {
		let entry = this._map.get(key)
		if (entry) {
			entry.value = value
			this._list.remove(entry)
			this._list._unshift(entry)
			return undefined
		}

		entry = this._list.unshift(value)
		entry[k_key] = key
		this._map.set(key, entry)

		if (this._list.size() > this._capacity) {
			entry = this._list._pop()
			this._map.delete(entry[k_key])
			return entry.value
		}

		return undefined
	}
}

module.exports = { Lru }
