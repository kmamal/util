
class Halton {
	constructor (base) {
		this._base = base
		this._index = 1
	}

	_next () {

	}

	random () {
		const base = this._base

		let reverse_base = 1 / base
		let n = this._index
		let value = 0
		while (n > 0) {
			value += (n % base) * reverse_base
			n /= base
			reverse_base /= base
		}

		return value
	}
}

module.exports = { Halton }
