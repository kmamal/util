const { getParent, getLeft, getRight } = require('../array/tree/binary')
const { sub } = require('../operators')

class Heap {
	constructor (init = [], options = {}) {
		this._array = Array.from(init, ([ prio, value ], index) => ({ prio, value, index }))
		this._compare = options.compare || sub
		this._heapify()
	}

	get size () { return this._array.length }

	add (prio, value) {
		const index = this._array.length
		const entry = { prio, value, index }
		this._array.push(entry)
		this._bubbleUp(entry)
		return entry
	}

	remove (entry) {
		const last = this._array[this._array.length - 1]
		this._swap(entry, last)
		this._array.pop()
		this._bubbleDown(last)
		return entry
	}

	update (entry, prio) {
		const old_prio = entry.prio
		entry.prio = prio
		this._compare(prio, old_prio) < 0
			? this._bubbleUp(entry)
			: this._bubbleDown(entry)
	}

	min () { return this._array[0] }
	pop () { return this.remove(this._array[0]) }

	_bubbleUp (entry) {
		for (;;) {
			const parent = this._array[getParent(entry.index)]
			if (!parent) { break }

			if (this._compare(parent.prio, entry.prio) < 0) { break }

			this._swap(entry, parent)
		}
	}

	_bubbleDown (entry) {
		for (;;) {
			const { index } = entry
			const left_child = this._array[getLeft(index)]
			if (!left_child) { break }

			const right_child = this._array[getRight(index)]
			const min_child = !right_child || this._compare(left_child.prio, right_child.prio) <= 0 ? left_child : right_child
			if (this._compare(entry.prio, min_child.prio) < 0) { break }

			this._swap(entry, min_child)
		}
	}

	_swap (a, b) {
		const ai = a.index
		const bi = b.index
		this._array[bi] = a
		this._array[ai] = b
		a.index = bi
		b.index = ai
	}

	_heapify () {
		const first = getParent(this._array.length - 1)
		for (let i = first; i >= 0; i--) {
			const entry = this._array[i]
			this._bubbleDown(entry)
		}
	}
}

module.exports = { Heap }
