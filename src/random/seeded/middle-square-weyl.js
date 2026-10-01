
const s = 0xda1ce2a9
const TWO_POW_12 = 2 ** 12
const TWO_POW_32 = 2 ** 32
const TWO_POW_52 = 2 ** 52

const _view = new DataView(new ArrayBuffer(8))

const _mix = (_h) => {
	let h = _h
	h ^= h >>> 16
	h = Math.imul(h, 0x85ebca6b)
	h ^= h >>> 13
	h = Math.imul(h, 0xc2b2ae35)
	h ^= h >>> 16
	return h
}

class MiddleSquareWeyl {
	constructor (seed) {
		this.seed(seed ?? 0)
	}

	seed (value) {
		_view.setFloat64(0, value, false)
		const high = _view.getUint32(0, false)
		const low = _view.getUint32(4, false)
		const a = _mix(high)
		const b = _mix(low ^ a)
		this._x = _mix(b ^ Math.imul(a, 0x9e3779b9)) & 0x000fffff
		this._w = b
	}

	next () {
		let { _x: x, _w: w } = this
		x *= x
		w = (w + s) | 0
		x += w
		x &= 0x3ffffC00
		x >>= 10
		this._x = x
		this._w = w
		return x
	}

	uniform () {
		const a = this.next()
		const b = this.next()
		const c = this.next()
		return (0
			+ (a * TWO_POW_32)
			+ (b * TWO_POW_12)
			+ (c & 0x0fff)
		) / TWO_POW_52
	}

	static WORD = 20
}

module.exports = { MiddleSquareWeyl }
