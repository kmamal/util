const { binarySearchWith } = require('../../array/search/binary')

const getKey = (key) => key
const getValue = (key, value) => value
const getEntry = (key, value) => [ key, value ]

class BTree {
	constructor (fn, order) {
		if (order < 4) { throw new Error("order < 4") }

		this._fn = fn
		this._order = order
		this._root = this._makeLeaf()
		this._first = this._root
		this._last = this._root
		this._size = 0
	}

	get size () { return this._size }

	has (key) { return this._has(this._root, key) }
	_has (node, key) {
		const index = binarySearchWith(node.keys, key, this._fn)
		return node.is_leaf
			? this._fn(node.keys[index], key) === 0
			: this._has(node.children[index], key)
	}

	get (key) { return this._get(this._root, key) }
	_get (node, key) {
		const index = binarySearchWith(node.keys, key, this._fn)
		return node.is_leaf
			? this._fn(node.keys[index], key) === 0
				? node.values[index]
				: undefined
			: this._get(node.children[index], key)
	}

	set (key, value) { return this._set(this._root, key, value) }
	_set (node, key, value) {
		const index = binarySearchWith(node.keys, key, this._fn)

		if (node.is_leaf) {
			if (this._fn(node.keys[index], key) === 0) {
				node.values[index] = value
				return false
			}

			this._size += 1

			node.keys.splice(index, 0, key)
			node.values.splice(index, 0, value)

			if (node.keys.length <= this._order) { return true }

			// Split Leaf
			const left = node
			const right = this._makeLeaf()
			const parent_key = this._balanceLeaves(left, right)

			left.prev = node.prev
			right.next = node.next
			left.next = right
			right.prev = left
			if (node === this._last) { this._last = right }

			if (node !== this._root) {
				return { key: parent_key, child: right }
			}

			// New Root
			this._root = this._makeNode()
			this._root.keys.push(parent_key)
			this._root.children.push(left, right)

			return true
		}

		// Recurse
		const result = this._set(node.children[index], key, value)
		if (result.key === undefined) { return result }

		node.keys.splice(index, 0, result.key)
		node.children.splice(index + 1, 0, result.child)

		if (node.keys.length < this._order) { return true }

		// Split Node
		const left = node
		const right = this._makeNode()
		const parent_key = this._balanceNodes(left, right)

		if (node !== this._root) {
			return { key: parent_key, child: right }
		}

		// New Root
		this._root = this._makeNode()
		this._root.keys.push(parent_key)
		this._root.children.push(left, right)

		return true
	}

	delete (key) { return this._delete(this._root, null, undefined, key) }
	_delete (node, parent, index_in_parent, key) {
		const index = binarySearchWith(node.keys, key, this._fn)

		if (node.is_leaf) {
			if (this._fn(node.keys[index], key) !== 0) { return false }

			this._size -= 1

			node.keys.splice(index, 1)
			node.values.splice(index, 1)

			if (node === this._root || node.values.length >= Math.ceil(this._order / 2)) { return true }

			if (parent.children.length === 1) { return { index: 0 } }

			const left_index = Math.max(0, index_in_parent - 1)
			const right_index = left_index + 1
			const left = parent.children[left_index]
			const right = parent.children[right_index]

			// Merge Leaves
			if (left.values.length + right.values.length < this._order) {
				left.keys.push(...right.keys)
				left.values.push(...right.values)

				left.next = right.next
				if (right === this._last) { this._last = left }
				return { index: right_index }
			}

			parent.keys[left_index] = this._balanceLeaves(left, right)
			return true
		}

		// Recurse
		const result = this._delete(node.children[index], node, index, key)
		if (result.index === undefined) { return result }

		node.keys.splice(result.index - 1, 1)
		node.children.splice(result.index, 1)

		// Delete Root
		if (node === this._root) {
			while (this._root.children?.length === 1) {
				this._root = this._root.children[0]
			}

			return true
		}

		if (node.children.length >= Math.ceil(this._order / 2)) { return true }

		if (parent.children.length === 1) { return { index: 0 } }

		const left_index = Math.max(0, index_in_parent - 1)
		const right_index = left_index + 1
		const left = parent.children[left_index]
		const right = parent.children[right_index]
		const parent_key = parent.keys[left_index]

		// Merge Nodes
		if (left.children.length + right.children.length < this._order) {
			left.keys.push(parent_key, ...right.keys)
			left.children.push(...right.children)
			return { index: right_index }
		}

		parent.keys[left_index] = this._balanceNodes(left, right, parent_key)
		return true
	}

	* keys () { yield* this._visit(getKey) }
	* values () { yield* this._visit(getValue) }
	* entries () { yield* this._visit(getEntry) }

	* _visit (visitor) {
		let node = this._first
		while (node) {
			for (let i = 0; i < node.keys.length; i++) {
				yield visitor(node.keys[i], node.values[i])
			}
			node = node.next
		}
	}

	_makeLeaf () {
		return {
			is_leaf: true,
			keys: [],
			values: [],
			prev: null,
			next: null,
		}
	}

	_makeNode () {
		return {
			is_leaf: false,
			keys: [],
			children: [],
		}
	}

	_balanceLeaves (left, right) {
		const left_length = left.values.length
		const right_length = right.values.length
		const avg = Math.floor((left_length + right_length) / 2)
		if (left_length < right_length) {
			const num = right_length - avg
			left.keys.push(...right.keys.splice(0, num))
			left.values.push(...right.values.splice(0, num))
		} else {
			right.keys.unshift(...left.keys.splice(avg))
			right.values.unshift(...left.values.splice(avg))
		}
		return left.keys[left.keys.length - 1]
	}

	_balanceNodes (left, right, parent_key) {
		const left_length = left.children.length
		const right_length = right.children.length
		const avg = Math.floor((left_length + right_length) / 2)
		if (left_length < right_length) {
			const num = right_length - avg
			parent_key !== undefined && left.keys.push(parent_key)
			left.keys.push(...right.keys.splice(0, num))
			left.children.push(...right.children.splice(0, num))
		} else {
			parent_key !== undefined && right.keys.unshift(parent_key)
			right.keys.unshift(...left.keys.splice(avg))
			right.children.unshift(...left.children.splice(avg))
		}
		return left.keys.pop()
	}

	_print () {
		const _print = (node, indent) => {
			if (node.is_leaf) {
				for (let i = 0; i < node.keys.length; i++) {
					console.log(`${indent}${node.keys[i]}(${node.values[i]})`)
				}
			} else {
				const child_indent = `${indent} `
				_print(node.children[0], child_indent)
				for (let i = 0; i < node.keys.length; i++) {
					console.log(`${indent}${node.keys[i]}`)
					_print(node.children[i + 1], child_indent)
				}
			}
		}
		_print(this._root, '')
	}
}

module.exports = { BTree }
