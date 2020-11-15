
class Halton {
	constructor (base) {
		this._base = base
		this._index = 1
	}

	random () {
		let n = this._index++

		const base = this._base
		let reverse_base = 1 / base
		let value = 0
		while (n > 0) {
			value += (n % base) * reverse_base
			n = Math.floor(n / base)
			reverse_base /= base
		}

		return value
	}
}

module.exports = { Halton }
