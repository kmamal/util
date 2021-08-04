
const triangular = (n) => n < 1 ? 0 : (n * (n + 1)) / 2

class _Base {
	constructor (n) {
		this._n = n
		this._array = new Array(triangular(n))
	}

	get (x, y) { return this._array[this._index(x, y)] }
	set (x, y, value) { this._array[this._index(x, y)] = value }
}

class LowerLeft extends _Base {
	_index (x, y) { return triangular(y) + x }
}

class LowerRight extends _Base {
	_index (x, y) { return triangular(y) + this._n - x - 1 }
}

class UpperLeft extends _Base {
	_index (x, y) { return triangular(this._n - y - 1) + x }
}

class UpperRight extends _Base {
	_index (x, y) { return triangular(this._n - y - 1) + this._n - x - 1 }
}

module.exports = {
	LowerLeft,
	LowerRight,
	UpperLeft,
	UpperRight,
}
