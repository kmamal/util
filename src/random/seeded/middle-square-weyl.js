
const s = 0xda1ce2a9

class MiddleSquareWeyl {
	constructor (seed) {
		this.seed(seed || 0)
	}

	seed (seed) {
		this._x = seed & 0xffff
		this._w = 0
	}

	next () {
		let { _x: x, _w: w } = this
		x *= x
		w = (w + s) | 0
		x += w
		x &= 0x00ffff00
		x >>= 8
		this._x = x
		this._w = w
		return x
	}

	random () {
		const a = this.next()
		const b = this.next()
		const c = this.next()
		const d = this.next()
		return (a * 2 ** 36 + b * 2 ** 20 + c * 2 ** 4 + (d & 0x0f)) / 2 ** 52
	}

	static WORD = 16
}

module.exports = { MiddleSquareWeyl }
