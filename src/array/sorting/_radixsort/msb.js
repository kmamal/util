const { __countingsort } = require('./countingsort')
const { __copy } = require('../../copy')
const { clone } = require('../../clone')

const __recurse1a = (a, start, end, fn, depth, cutoff, takeover) => {
	// console.group({ depth, start, end, a })
	if (depth > 31) { return }

	if (end - start <= cutoff) {
		const _fn = (x, y) => fn(x) - fn(y)
		takeover(a, start, end, _fn)
		// console.log({ depth, start, end, a })
		// console.groupEnd()
		return
	}

	const mask = 1 << (31 - depth)

	let start_index = start
	let end_index = end - 1
	for (;;) {
		while (start_index < end) {
			const item = a[start_index]
			const should_swap = fn(item) & mask
			if (should_swap) { break }
			start_index += 1
		}

		while (end_index > start) {
			const item = a[end_index]
			const should_swap = ~fn(item) & mask
			if (should_swap) { break }
			end_index -= 1
		}

		if (start_index >= end_index) { break }

		const tmp = a[end_index]
		a[end_index] = a[start_index]
		a[start_index] = tmp
		start_index += 1
		end_index -= 1
	}
	// console.log({ a, start_index })

	__recurse1a(a, start, start_index, fn, depth + 1, cutoff, takeover)
	__recurse1a(a, start_index, end, fn, depth + 1, cutoff, takeover)
	// console.log({ depth, start, end, a })
	// console.groupEnd()
}

const __radixsort1a = (arr, start, end, fn, cutoff, takeover) => {
	__recurse1a(arr, start, end, fn, 0, cutoff, takeover)
}

const __recurse1b = (a, start, end, fn, depth, cutoff, takeover) => {
	// console.group({ depth, start, end, a })
	if (depth > 31) { return }

	if (end - start <= cutoff) {
		const _fn = (x, y) => fn(x) - fn(y)
		takeover(a, start, end, _fn)
		// console.log({ depth, start, end, a })
		// console.groupEnd()
		return
	}

	const mask = 1 << (31 - depth)

	let partition = start
	for (let i = start; i < end; i++) {
		const item = a[i]
		const should_swap = ~fn(item) & mask
		if (should_swap) {
			a[i] = a[partition]
			a[partition] = item
			partition += 1
		}
	}
	// console.log({ a, partition })

	__recurse1b(a, start, partition, fn, depth + 1, cutoff, takeover)
	__recurse1b(a, partition, end, fn, depth + 1, cutoff, takeover)
	// console.log({ depth, start, end, a })
	// console.groupEnd()
}

const __radixsort1b = (arr, start, end, fn, cutoff, takeover) => {
	__recurse1b(arr, start, end, fn, 0, cutoff, takeover)
}

const __recurse2 = (arr, buffer, start, end, fn, depth, cutoff, takeover) => {
	// console.group({ depth, start, end, arr })

	if (depth > 31) {
		if (depth % 2) {
			buffer[start] = arr[start]
		}
		// console.groupEnd()
		return
	}

	if (end - start <= cutoff) {
		const _fn = (x, y) => fn(x) - fn(y)
		if (depth % 2) {
			__copy(buffer, start, arr, start, end)
			takeover(buffer, start, end, _fn)
			// console.log({ depth, start, end, buffer })
		} else {
			takeover(arr, start, end, _fn)
			// console.log({ depth, start, end, arr })
		}
		// console.groupEnd()
		return
	}

	const mask = 1 << (31 - depth)

	let start_index = start
	let end_index = end - 1
	for (;;) {
		while (start_index <= end_index) {
			const item = arr[start_index]
			buffer[start_index] = item
			const should_swap = fn(item) & mask
			if (should_swap) { break }
			start_index += 1
		}

		while (end_index >= start_index) {
			const item = arr[end_index]
			buffer[end_index] = item
			const should_swap = ~fn(item) & mask
			if (should_swap) { break }
			end_index -= 1
		}

		if (start_index >= end_index) { break }

		buffer[end_index] = arr[start_index]
		buffer[start_index] = arr[end_index]
		start_index += 1
		end_index -= 1
	}
	// console.log({ buffer, start_index })

	__recurse2(buffer, arr, start, start_index, fn, depth + 1, cutoff, takeover)
	__recurse2(buffer, arr, start_index, end, fn, depth + 1, cutoff, takeover)
	// console.log({ depth, start, end, arr })
	// console.groupEnd()
}

const __radixsort2 = (arr, start, end, fn, cutoff, takeover) => {
	const buffer = Array(end - start)
	__recurse2(arr, buffer, start, end, fn, 0, cutoff, takeover)
}

const __recurse3 = (arr, buffer, counts, start, end, fn, depth, cutoff, takeover) => {
	console.group({ depth, start, end, arr })

	if (depth === 4) {
		if (depth % 2) {
			__copy(buffer, start, arr, start, end)
		}
		console.groupEnd()
		return
	}

	if (end - start <= cutoff) {
		const _fn = (x, y) => fn(x) - fn(y)
		if (depth % 2) {
			__copy(buffer, start, arr, start, end)
			takeover(buffer, start, end, _fn)
			console.log({ depth, start, end, buffer })
		} else {
			takeover(arr, start, end, _fn)
			console.log({ depth, start, end, arr })
		}
		console.groupEnd()
		return
	}

	const offset = (3 - depth) * 8
	const mask = 0xff << offset
	const getByte = (x) => (fn(x) & mask) >> offset
	__countingsort(counts, buffer, start, arr, start, end, 256, getByte)
	console.log({ counts })

	let prev = 0
	for (const index of counts.slice()) {
		if (index === prev) { continue }
		__recurse3(buffer, arr, counts, prev, index, fn, depth + 1, cutoff, takeover)
		prev = index
	}
	console.log({ depth, start, end, arr })
	console.groupEnd()
}

const __radixsort3 = (arr, start, end, fn, cutoff, takeover) => {
	const buffer = Array(end - start)
	const counts = Array(256)
	__recurse3(arr, buffer, counts, start, end, fn, 0, cutoff, takeover)
}

const __radixsort4 = (arr, start, end, fn) => {
	const buffer = Array(end - start)
	const counts = Array(256)

	let src = arr
	let dst = buffer
	let mask = 0xff
	let offset = 0
	const getByte = (x) => (fn(x) & mask) >> offset
	for (let i = 0; i < 4; i++) {
		__countingsort(counts, dst, start, src, start, end, 256, getByte)

		const tmp = src
		src = dst
		dst = tmp
		mask <<= 8
		offset += 8
	}
}

module.exports = {
	__radixsort1a,
	__radixsort1b,
	__radixsort2,
	__radixsort3,
	__radixsort4,
}
