const { slice } = require('./slice')

const __flat = (dst, dst_start, src, src_start, src_end, _max_depth) => {
	const max_depth = _max_depth + 1
	let write_index = dst_start

	const stack = [ { arr: src, length: src_end - src_start, index: 0 } ]
	for (;;) {
		const { length: depth } = stack

		const top = stack[depth - 1]
		if (top.index === top.length) {
			if (depth === 1) { break }
			stack.pop()
			continue
		}

		const item = top.arr[top.index++]
		if (Array.isArray(item) && depth < max_depth) {
			stack.push({ arr: item, length: item.length, index: 0 })
			continue
		}

		dst[write_index++] = item
	}

	return write_index - dst_start
}

const flat$$$ = (arr, _max_depth = 1) => {
	const n = __flat(arr, 0, slice(arr), 0, arr.length, _max_depth)
	arr.length = n
	return arr
}

const flat = (arr, _max_depth = 1) => {
	const res = []
	__flat(res, 0, arr, 0, arr.length, _max_depth)
	return res
}

flat.$$$ = flat$$$

module.exports = { flat }
