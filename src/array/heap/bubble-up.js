const { getParent } = require('../tree/binary')

const __bubbleUp = (arr, start, end, _index, fn) => {
	let index = _index
	for (;;) {
		const parent_index = start + getParent(index - start)
		if (parent_index < start) { break }

		const parent = arr[parent_index]
		const value = arr[index]
		if (fn(parent, value) < 0) { break }

		arr[parent_index] = value
		arr[index] = parent
		index = parent_index
	}
}

module.exports = { __bubbleUp }
