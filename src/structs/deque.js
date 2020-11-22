
class Deque {
	constructor () {
		this._size = 0
		this._first = null
		this._last = null
	}

	size () { return this._size }

	_unshift (entry) {
		this._size += 1
		entry.prev = null
		entry.next = this._first
		if (this._first) { this._first.prev = entry }
		this._first = entry
		if (!this._last) { this._last = entry }
		return entry
	}

	unshift (value) { return this._unshift({ value }) }

	_push (entry) {
		this._size += 1
		entry.prev = this._last
		entry.next = null
		if (this._last) { this._last.next = entry }
		this._last = entry
		if (!this._first) { this._first = entry }
		return entry
	}

	push (value) { return this._push({ value }) }

	_shift () {
		this._size -= 1
		const entry = this._first
		if (!entry) {
			this._last = null
			this._first = null
			return null
		}
		const { next } = entry
		if (next) {
			this._first = next
			next.prev = null
		}
		return entry
	}

	shift () { return this._shift?.value }

	_pop () {
		this._size -= 1
		const entry = this._last
		if (!entry) {
			this._last = null
			this._first = null
			return null
		}
		const { prev } = entry
		if (prev) {
			this._last = prev
			prev.next = null
		}
		return entry
	}

	pop () { return this._pop?.value }

	remove (entry) {
		this._size -= 1
		const { prev, next } = entry
		if (prev) {
			prev.next = next
		} else {
			this._first = next
		}
		if (next) {
			next.prev = prev
		} else {
			this._last = prev
		}
		return entry
	}
}

module.exports = { Deque }
