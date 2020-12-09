
class List {
	constructor () {
		this._size = 0
		this._first = null
	}

	size () { return this._size }

	first () { return this._first?.value }

	last () { return this._last()?.value }
	_last () {
		let entry = this._first
		if (!entry) { return null }
		while (entry.next) { entry = entry.next }
		return entry
	}

	nth (n) { return this._nth(n)?.value }
	_nth (n) {
		let entry = this._first
		for (let i = 0; i < n; i++) {
			if (!entry) { return null }
			entry = entry.next
		}
		return entry
	}

	unshift (value) {
		const entry = { value }
		this._unshift(entry)
		return entry
	}

	_unshift (entry) {
		this._size++
		entry.next = this._first
		this._first = entry
	}

	shift () { return this._shift()?.value }
	_shift () {
		this._size--
		const entry = this._first
		this._first = this._first.next
		return entry
	}

	push (value) {
		const entry = { value }
		this._push(entry)
		return entry
	}

	_push (entry) {
		const last = this.last()
		if (!last) {
			this._unshift(entry)
		} else {
			this._size++
			last.next = entry
		}
	}

	pop () { return this._pop()?.value }
	_pop () {
		const prev = this.nth(this._size - 2)
		if (!prev) { return null }

		this._size--
		const entry = prev.next
		prev.next = null
		return entry
	}

	insertAfter (prev, value) {
		const entry = { value }
		this._insertAfter(prev, entry)
		return entry
	}

	_insertAfter (prev, entry) {
		this._size++
		entry.next = prev.next
		prev.next = entry
	}

	find (fn) { return this._find(({ value }) => fn(value)) }
	_find (fn) {
		let entry = this._first
		while (entry) {
			if (fn(entry)) { return entry }
			entry = entry.next
		}
		return null
	}

	remove (value) {
		if (this._first?.value === value) { return this._shift() }
		const prev = this._find(({ next }) => next?.value === value)
		if (!prev) { return null }

		this._size--
		const entry = prev.next
		prev.next = entry.next
		return entry
	}

	_remove (entry) {
		if (this._first === entry) { this._shift() }
		const prev = this._find(({ next }) => next === entry)
		if (prev) { this.removeAfter(prev) }
	}

	removeAfter (prev) {
		this._size--
		prev.next = prev.next.next
	}
}

module.exports = { List }
