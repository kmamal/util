const { DoublyLinkedList } = require('../doubly-linked-list')

const kKey = Symbol("key")
const kTime = Symbol("time")

class Age {
	constructor (lifetime, eager = true) {
		this._lifetime = lifetime
		this._eager = eager
		this._list = new DoublyLinkedList()
		this._map = new Map()
	}

	get size () { return this._map.size }

	has (key) {
		return Boolean(this._peekNode(key))
	}

	get (key) {
		return this._getNode(key)?.value
	}

	set (key, value) {
		const now = Date.now()

		let node = this._getNode(key, now)?.value
		if (node) {
			const oldValue = node.value
			node.value = value
			return oldValue
		}

		node = this._list._unshift(value)
		node[kKey] = key
		node[kTime] = now
		this._map.set(key, node)

		return undefined
	}

	delete (key) {
		const node = this._map.get(key)
		if (!node) { return undefined }
		this._list._remove(node)
		this._map.delete(key)
		return node.value
	}

	_peekNode (key, now = Date.now()) {
		let node = this._map.get(key)
		if (!node) { return null }

		const elapsed = now - node[kTime]
		const remaining = this._lifetime - elapsed
		if (remaining > 0) { return node }

		this._map.delete(node[kKey])
		this._list._remove(node)

		if (this._eager) {
			node = node.next
			while (node) {
				this._map.delete(node[kKey])
				this._list._remove(node)
				node = node.next
			}
		}

		return null
	}

	_getNode (key, now = Date.now()) {
		const node = this._peekNode(key, now)
		if (!node) { return null }

		this._list._remove(node)
		this._list._unshiftNode(node)
		node[kTime] = now
		return node
	}
}

module.exports = { Age }
