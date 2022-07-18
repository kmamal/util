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

	let startIndex = start
	let endIndex = end - 1
	for (;;) {
		while (startIndex < end) {
			const item = a[startIndex]
			const shouldSwap = fn(item) & mask
			if (shouldSwap) { break }
			startIndex += 1
		}

		while (endIndex > start) {
			const item = a[endIndex]
			const shouldSwap = ~fn(item) & mask
			if (shouldSwap) { break }
			endIndex -= 1
		}

		if (startIndex >= endIndex) { break }

		const tmp = a[endIndex]
		a[endIndex] = a[startIndex]
		a[startIndex] = tmp
		startIndex += 1
		endIndex -= 1
	}
	// console.log({ a, startIndex })

	__recurse1a(a, start, startIndex, fn, depth + 1, cutoff, takeover)
	__recurse1a(a, startIndex, end, fn, depth + 1, cutoff, takeover)
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
		const shouldSwap = ~fn(item) & mask
		if (shouldSwap) {
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

	let startIndex = start
	let endIndex = end - 1
	for (;;) {
		while (startIndex <= endIndex) {
			const item = arr[startIndex]
			buffer[startIndex] = item
			const shouldSwap = fn(item) & mask
			if (shouldSwap) { break }
			startIndex += 1
		}

		while (endIndex >= startIndex) {
			const item = arr[endIndex]
			buffer[endIndex] = item
			const shouldSwap = ~fn(item) & mask
			if (shouldSwap) { break }
			endIndex -= 1
		}

		if (startIndex >= endIndex) { break }

		buffer[endIndex] = arr[startIndex]
		buffer[startIndex] = arr[endIndex]
		startIndex += 1
		endIndex -= 1
	}
	// console.log({ buffer, startIndex })

	__recurse2(buffer, arr, start, startIndex, fn, depth + 1, cutoff, takeover)
	__recurse2(buffer, arr, startIndex, end, fn, depth + 1, cutoff, takeover)
	// console.log({ depth, start, end, arr })
	// console.groupEnd()
}

const __radixsort2 = (arr, start, end, fn, cutoff, takeover) => {
	const buffer = new Array(end - start)
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
	const buffer = new Array(end - start)
	const counts = new Array(256)
	__recurse3(arr, buffer, counts, start, end, fn, 0, cutoff, takeover)
}

const __radixsort4 = (arr, start, end, fn) => {
	const buffer = new Array(end - start)
	const counts = new Array(256)

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
