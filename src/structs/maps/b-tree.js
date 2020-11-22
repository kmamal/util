const { bisectWith } = require('../../array/bisect')

const getKey = (key) => key
const getValue = (key, value) => value
const getEntry = (key, value) => [ key, value ]

class BTree {
	constructor (fn, order) {
		if (order < 4) { throw new Error('order < 4') }

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
		const index = bisectWith(node.keys, key, this._fn)
		return node.is_leaf
			? this._fn(node.keys[index], key) === 0
			: this._has(node.children[index], key)
	}

	get (key) { return this._get(this._root, key) }
	_get (node, key) {
		const index = bisectWith(node.keys, key, this._fn)
		return node.is_leaf
			? this._fn(node.keys[index], key) === 0
				? node.values[index]
				: undefined
			: this._get(node.children[index], key)
	}

	set (key, value) { return this._set(this._root, key, value) }
	_set (node, key, value) {
		const index = bisectWith(node.keys, key, this._fn)
		if (node.is_leaf) {
			if (this._fn(node.keys[index], key) === 0) {
				node.values[index] = value
				return false
			}

			this._size += 1

			node.keys.splice(index, 0, key)
			node.values.splice(index, 0, value)

			if (node.keys.length > this._order) {
				const left = node
				const right = this._makeLeaf()

				left.prev = node.prev
				right.next = node.next
				left.next = right
				right.prev = left
				if (node === this._last) { this._last = right }

				const half = Math.floor(node.keys.length / 2)
				right.keys.push(...left.keys.splice(half))
				right.values.push(...left.values.splice(half))

				const parent_key = left.keys[left.keys.length - 1]

				if (node !== this._root) {
					return { key: parent_key, child: right }
				}

				this._root = this._makeNode()
				this._root.keys.push(parent_key)
				this._root.children.push(left, right)
			}

			return true
		}

		const result = this._set(node.children[index], key, value)

		if (result.key !== undefined) {
			node.keys.splice(index, 0, result.key)
			node.children.splice(index + 1, 0, result.child)

			if (node.keys.length === this._order) {
				const left = node
				const right = this._makeNode()
				const half = Math.floor(node.keys.length / 2)
				right.keys.push(...left.keys.splice(half))
				right.children.push(...left.children.splice(half))

				const parent_key = left.keys.pop()

				if (node !== this._root) {
					return { key: parent_key, child: right }
				}

				this._root = this._makeNode()
				this._root.keys.push(parent_key)
				this._root.children.push(left, right)
			}

			return true
		}

		return result
	}

	delete (key) { return this._delete(this._root, null, undefined, key) }
	_delete (node, parent, index_in_parent, key) {
		const index = bisectWith(node.keys, key, this._fn)
		if (node.is_leaf) {
			if (this._fn(node.keys[index], key) !== 0) { return false }

			this._size -= 1

			node.keys.splice(index, 1)
			node.values.splice(index, 1)

			if (node === this._root) { return true }

			if (node.values.length < Math.ceil(this._order / 2)) {
				if (parent.children.length === 1) { return { index: 0 } }

				const left_index = Math.max(0, index_in_parent - 1)
				const right_index = left_index + 1

				const left = parent.children[left_index]
				const right = parent.children[right_index]

				const left_length = left.values.length
				const right_length = right.values.length

				if (left_length + right_length < this._order) {
					left.keys.push(...right.keys)
					left.values.push(...right.values)

					left.next = right.next
					if (right === this._last) { this._last = left }

					return { index: right_index }
				}

				const avg = Math.floor((left_length + right_length) / 2)
				if (left_length < right_length) {
					const num = right_length - avg
					left.keys.push(...right.keys.splice(0, num))
					left.values.push(...right.values.splice(0, num))
				} else {
					right.keys.unshift(...left.keys.splice(avg))
					right.values.unshift(...left.values.splice(avg))
				}
				parent.keys[left_index] = left.keys[left.keys.length - 1]
			}

			return true
		}

		const result = this._delete(node.children[index], node, index, key)

		if (result.index !== undefined) {
			node.keys.splice(result.index - 1, 1)
			node.children.splice(result.index, 1)

			if (node === this._root) {
				while (this._root.children?.length === 1) {
					this._root = this._root.children[0]
				}

				return true
			}

			if (node.children.length < Math.ceil(this._order / 2)) {
				if (parent.children.length === 1) { return { index: 0 } }

				const left_index = Math.max(0, index_in_parent - 1)
				const right_index = left_index + 1
				const left = parent.children[left_index]
				const right = parent.children[right_index]

				const left_length = left.children.length
				const right_length = right.children.length

				if (left_length + right_length < this._order) {
					if (left.children.length > 0) {
						left.keys.push(parent.keys[left_index])
					}
					left.keys.push(...right.keys)
					left.children.push(...right.children)
					return { index: right_index }
				}

				const avg = Math.floor((left_length + right_length) / 2)
				if (left_length < right_length) {
					const num = right_length - avg
					left.keys.push(parent.keys[left_index])
					left.keys.push(...right.keys.splice(0, num))
					left.children.push(...right.children.splice(0, num))
					parent.keys[left_index] = left.keys.pop()
				} else {
					if (right.children.length > 0) {
						right.keys.unshift(parent.keys[left_index])
					}
					right.keys.unshift(...left.keys.splice(avg))
					right.children.unshift(...left.children.splice(avg))
					parent.keys[left_index] = left.keys.pop()
				}
			}

			return true
		}

		return result
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
