const { __insertionsort } = require('./insertionsort')
const { __reverse } = require('../reverse')
const { __mergeInplace } = require('../merge')
const { compare } = require('../../function/compare')
const { clone } = require('../clone')
const { map } = require('../map')

const extract = ({ x }) => x

const __findNextRunAscending = (arr, start, end, fn) => {
	let prev = arr[start]
	let index = start + 1
	while (index < end) {
		const item = arr[index]
		if (fn(prev, item) > 0) { break }
		prev = item
		index += 1
	}
	return index
}

const __findNextRunDescending = (arr, start, end, fn) => {
	let prev = arr[start]
	let index = start + 1
	while (index < end) {
		const item = arr[index]
		if (fn(prev, item) <= 0) { break }
		prev = item
		index += 1
	}
	return index
}

const __findNextRun = (arr, start, end, fn, min_run) => {
	let index = __findNextRunAscending(arr, start, end, fn)
	const second = start + 1
	if (index === second) {
		index = __findNextRunDescending(arr, start, end, fn)
		if (index !== second) {
			__reverse(arr, start, arr, start, index)
		}
	}

	// return index
	if (index - start >= min_run) { return index }

	const run_end = Math.min(end, start + min_run)
	__insertionsort(arr, start, index, run_end, fn, index)
	return run_end
}

class MergeStack {
	constructor (arr, start, end, fn) {
		this._arr = arr
		this._start = start
		this._end = end
		this._fn = fn
		this._buffer = new Array(Math.floor((end - start) / 2))

		this._stack = []
		this._a = null
		this._b = null
		this._c = null
	}

	length () { return this._stack.length + (this._a ? 1 : 0) + (this._b ? 1 : 0) + (this._c ? 1 : 0) }

	push (index) {
		const last_index = this._c ? this._c.end : this._start
		if (this._a) { this._stack.push(this._a) }
		this._a = this._b
		this._b = this._c
		this._c = { length: index - last_index, start: last_index, end: index }

		this.maybeMerge()
	}

	maybeMerge () {
		if (!this._b) { return }
		if (this._b.length <= this._c.length) {
			this.merge()
			return
		}
		if (!this._a) { return }
		if (this._a.length <= this._b.length + this._c.length) {
			this.merge()
		}
	}

	merge () {
		if (!this._a || (this._a.length >= this._c.length)) {
			__mergeInplace(this._arr, this._b.start, this._b.end, this._c.end, this._buffer, this._fn)
			this._c = { length: this._b.length + this._c.length, start: this._b.start, end: this._c.end }
			this._b = this._a
		} else {
			__mergeInplace(this._arr, this._a.start, this._a.end, this._b.end, this._buffer, this._fn)
			this._b = { length: this._a.length + this._b.length, start: this._a.start, end: this._b.end }
		}
		this._a = this._stack.pop()

		this.maybeMerge()
	}
}

const __timsort = (arr, start, end, fn) => {
	const stack = new MergeStack(arr, start, end, fn)

	const length = end - start
	const set_bits = 32 - Math.clz32(length)
	const shift = Math.max(0, set_bits - 5)
	const remainder = length & (2 ** shift - 1)
	const min_run = (length >> shift) + (remainder ? 1 : 0)

	let index = start
	while (index < end) {
		index = __findNextRun(arr, index, end, fn, min_run)
		stack.push(index)
	}

	while (stack.length() > 1) {
		stack.merge()
	}
}

const __timsort2 = (arr, start, end, fn) => {
	const length = end - start

	const runs = []
	let a = null
	let b = null
	let c = null
	const buffer = new Array(Math.floor(length / 2))

	const __maybeMergeRuns = () => {
		if (!b) { return }
		if (b.length <= c.length) {
			__mergeRuns()
			return
		}
		if (!a) { return }
		if (a.length <= b.length + c.length) {
			__mergeRuns()
		}
	}

	const __mergeRuns = () => {
		if (!a || (a.length >= c.length)) {
			__mergeInplace(arr, b.start, b.end, c.end, buffer, fn)
			c = { length: b.length + c.length, start: b.start, end: c.end }
			b = a
		} else {
			__mergeInplace(arr, a.start, a.end, b.end, buffer, fn)
			b = { length: a.length + b.length, start: a.start, end: b.end }
		}
		a = runs.pop()

		__maybeMergeRuns()
	}

	const set_bits = 32 - Math.clz32(length)
	const shift = Math.max(0, set_bits - 5)
	const remainder = length & (2 ** shift - 1)
	const min_run = (length >> shift) + (remainder ? 1 : 0)

	let index = start
	while (index < end) {
		index = __findNextRun(arr, index, end, fn, min_run)
		const last_index = c ? c.end : start

		if (a) { runs.push(a) }
		a = b
		b = c
		c = { length: index - last_index, start: last_index, end: index }

		__maybeMergeRuns()
	}

	while (b) {
		__mergeRuns(runs, arr, start, end, fn)
	}
}

const timsortWith$$$ = (arr, fn) => {
	__timsort(arr, 0, arr.length, fn)
	return arr
}

const timsortWith = (arr, fn) => {
	const res = clone(arr)
	__timsort(res, 0, res.length, fn)
	return res
}

timsortWith.$$$ = timsortWith$$$

const timsortBy$$$ = (arr, fn) => timsortWith$$$(arr, (a, b) => compare(fn(a), fn(b)))

const timsortBy = (arr, fn) => timsortWith(arr, (a, b) => compare(fn(a), fn(b)))

timsortBy.$$$ = timsortBy$$$

const timsortByPure$$$ = (arr, fn) => {
	map.$$$(arr, (x) => ({ x, value: fn(x) }))
	timsortWith$$$(arr, (a, b) => compare(a.value, b.value))
	return map.$$$(arr, extract)
}

const timsortByPure = (arr, fn) => {
	const res = map(arr, (x) => ({ x, value: fn(x) }))
	timsortWith$$$(res, (a, b) => compare(a.value, b.value))
	return map.$$$(res, extract)
}

timsortByPure.$$$ = timsortByPure$$$

const timsort$$$ = (arr) => timsortWith$$$(arr, compare)

const timsort = (arr) => timsortWith(arr, compare)

timsort.$$$ = timsort$$$

module.exports = {
	__timsort,
	timsortWith,
	timsortBy,
	timsortByPure,
	timsort,
}
