
const triangular = (n) => n < 1 ? 0 : (n * (n + 1)) / 2

class _Base {
	constructor (n) {
		this._n = n
		this._array = new Array(triangular(n))
	}

	get (i, j) { return this._array[this._index(i, j)] }
	set (i, j, value) { this._array[this._index(i, j)] = value }
}

class LowerLeft extends _Base {
	_index (i, j) { return triangular(i) + j }
}

class LowerRight extends _Base {
	_index (i, j) { return triangular(i) + this._n - j - 1 }
}

class UpperLeft extends _Base {
	_index (i, j) { return triangular(this._n - i - 1) + j }
}

class UpperRight extends _Base {
	_index (i, j) { return triangular(this._n - i - 1) + this._n - j - 1 }
}


module.exports = {
	LowerLeft,
	LowerRight,
	UpperLeft,
	UpperRight,
}
