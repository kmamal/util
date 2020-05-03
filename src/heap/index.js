
const parent = (index) => Math.floor((index - 1) / 2)
const left = (index) => index * 2 + 1
const right = (index) => index * 2 + 2

class Heap {
	constructor () {
		this._array = []
	}

	add (prio, value) {
		const index = this._array.length
		const entry = { prio, value, index }
		this._array.push(entry)
		this._bubbleUp(index)
		return entry
	}

	remove (entry) {
		entry.prio = Infinity
		this._bubbleDown(entry.index)
		return this._array.pop().value
	}

	update (entry, prio) {
		const old_prio = entry.prio
		entry.prio = prio
		prio < old_prio
			? this._bubbleUp(entry.index)
			: this._bubbleDown(entry.index)
	}

	min () { return this._array[0].value }
	pop () { return this.remove(this._array[0]) }

	_bubbleUp (_index) {
		//
	}

	_bubbleDown (index) {
		//
	}
}

module.exports = { Heap }
