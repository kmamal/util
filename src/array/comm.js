const { compare } = require('../function/compare')
const { identity } = require('../function/identity')

const __comm = (only_a, both, only_b, a, a_start, a_end, b, b_start, b_end, fn) => {
	let a_index = a_start
	let b_index = b_start
	let a_item = a[a_start]
	let b_item = b[b_start]

	while (a_index < a_end && b_index < b_end) {
		const cmp = fn(a_item, b_item)
		if (cmp < 0) {
			if (only_a) { only_a.arr[only_a.index++] = a_item }
			a_item = a[++a_index]
		} else if (cmp === 0) {
			if (both) { both.arr[both.index++] = a_item }
			a_item = a[++a_index]
			b_item = b[++b_index]
		} else {
			if (only_b) { only_b.arr[only_b.index++] = b_item }
			b_item = b[++b_index]
		}
	}

	if (only_a) {
		while (a_index < a_end) {
			only_a.arr[only_a.index++] = a[a_index++]
		}
	}

	if (only_b) {
		while (b_index < b_end) {
			only_b.arr[only_b.index++] = b[b_index++]
		}
	}
}

const commWith = (a, b, fn) => {
	const only_a = { arr: [], index: 0 }
	const both = { arr: [], index: 0 }
	const only_b = { arr: [], index: 0 }

	__comm(only_a, both, only_b, a, 0, a.length, b, 0, b.length, fn)

	return {
		a: only_a.arr,
		ab: both.arr,
		b: only_b.arr,
	}
}

const commBy = (a, b, fn) => commWith(a, b, (x, y) => compare(fn(x), fn(y)))

const comm = (a, b) => commBy(a, b, identity)

module.exports = {
	__comm,
	commWith,
	commBy,
	comm,
}