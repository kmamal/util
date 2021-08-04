const { DoublyLinkedList } = require('../doubly-linked-list')

const kKey = Symbol("key")

class Lru {
	constructor (capacity) {
		this._capacity = capacity
		this._list = new DoublyLinkedList()
		this._map = new Map()
	}

	get size () { return this._map.size }

	has (key) {
		return this._map.has(key)
	}

	get (key) {
		return this._getNode(key)?.value
	}

	set (key, value) {
		let node = this._getNode(key)
		if (node) {
			const oldValue = node.value
			node.value = value
			return oldValue
		}

		node = this._list._unshift(value)
		node[kKey] = key
		this._map.set(key, node)

		if (this._list.size() > this._capacity) {
			node = this._list._pop()
			this._map.delete(node[kKey])
		}

		return undefined
	}

	delete (key) {
		const node = this._map.get(key)
		if (!node) { return undefined }
		this._list._remove(node)
		this._map.delete(key)
		return node.value
	}

	_getNode (key) {
		const node = this._map.get(key)
		if (!node) { return undefined }
		this._list._remove(node)
		this._list._unshiftNode(node)
		return node
	}
}

module.exports = { Lru }
