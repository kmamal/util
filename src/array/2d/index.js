const endpoints = require('./endpoints')
const { fromFactory: fromFactory1d, proxied: proxied1d } = require('..')

class Array2d {
	constructor (w, h, arr) {
		const size = w * h
		this._array = arr || Array(size)
		this._w = w
		this._h = h
	}

	_index (x, y) { return y * this._w + x }

	w () { return this._w }
	h () { return this._h }
	size () { return this._size }
	raw () { return this._array }

	get (x, y) { return this._array[this._index(x, y)] }
	set (x, y, value) { this._array[this._index(x, y)] = value }

	fill (...args) {
		const clone = this.clone()
		return clone.fill_BANG(...args)
	}

	fill_BANG (fill, _start, _end) {
		const [ start_i, start_j ] = endpoints.start(this._w, this._h, _start)
		const [ end_i, end_j ] = endpoints.end(this._w, this._h, _end)
		const x_range = end_i - start_i
		const y_range = end_j - start_j
		const step = this._w - x_range
		const array = this._array
		let index = this._index(start_i, start_j)
		for (let j = 0; j < y_range; j++) {
			for (let i = 0; i < x_range; i++) {
				array[index] = fill
				index += 1
			}
			index += step
		}

		return this
	}

	copy (...args) {
		const clone = this.clone()
		return clone.copy_BANG(...args)
	}

	copy_BANG (other, _offset, _start, _end) {
		const [ offset_i, offset_j ] = endpoints.start(this._w, this._h, _offset)
		const [ start_i, start_j ] = endpoints.start(other._w, other._h, _start)
		const [ end_i, end_j ] = endpoints.end(other._w, other._h, _end)
		const x_range = end_i - start_i
		const y_range = end_j - start_j
		const self_array = this._array
		const other_array = other._array
		let self_index = this._index(offset_i, offset_j)
		let other_index = this._index(start_i, start_j)
		const self_step = this._w - x_range
		const other_step = other._w - x_range

		for (let j = 0; j < y_range; j++) {
			for (let i = 0; i < x_range; i++) {
				self_array[self_index] = other_array[other_index]
				self_index += 1
				other_index += 1
			}
			self_index += self_step
			other_index += other_step
		}

		return this
	}

	combine (...args) {
		const clone = this.clone()
		return clone.combine_BANG(...args)
	}

	combine_BANG (other, combiner, _offset, _start, _end) {
		const [ offset_i, offset_j ] = endpoints.start(this._w, this._h, _offset)
		const [ start_i, start_j ] = endpoints.start(other._w, other._h, _start)
		const [ end_i, end_j ] = endpoints.end(other._w, other._h, _end)
		const x_range = end_i - start_i
		const y_range = end_j - start_j
		const self_array = this._array
		const other_array = other._array
		let self_index = this._index(offset_i, offset_j)
		let other_index = this._index(start_i, start_j)
		const self_step = this._w - x_range
		const other_step = other._w - x_range

		for (let j = 0; j < y_range; j++) {
			for (let i = 0; i < x_range; i++) {
				self_array[self_index] = combiner(self_array[self_index], other_array[other_index])
				self_index += 1
				other_index += 1
			}
			self_index += self_step
			other_index += other_step
		}

		return this
	}

	slice (_start, _end) {
		const [ start_i, start_j ] = endpoints.start(this._w, this._h, _start)
		const [ end_i, end_j ] = endpoints.end(this._w, this._h, _end)
		const w = end_i - start_i
		const h = end_j - start_j
		return new Array2d(w, h).copy_BANG(this, [ 0, 0 ], _start, _end)
	}

	clone () {
		const array = Array.from(this._array)
		return new Array2d(this._w, this._h, array)
	}

	static from1d (array) {
		return new Array2d(array.length, 1, array)
	}

	static fromFactory (w, h, map) {
		const arr = Array(w * h)
		let offset = 0
		for (let j = 0; j < h; j++) {
			for (let i = 0; i < w; i++) {
				arr[offset] = map(i, j)
				offset += 1
			}
		}
		return new Array2d(w, h, arr)
	}

	proxy () {
		if (!this._proxied) {
			const w = this._w
			const length = () => w
			this._proxied = fromFactory1d(this._y, (j) => {
				const offset = j * w
				return proxied1d({
					get: (i) => this._array[offset + i],
					set: (i, value) => (this._array[offset + i] = value),
					length,
				})
			})
		}
		return this._proxied
	}
}

module.exports = { Array2d }
