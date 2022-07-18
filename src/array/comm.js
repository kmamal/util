const { compare } = require('../function/compare')

const __comm = (onlyA, both, onlyB, a, aStart, aEnd, b, bStart, bEnd, fnCmp) => {
	let aIndex = aStart
	let bIndex = bStart
	let aItem = a[aStart]
	let bItem = b[bStart]

	while (aIndex < aEnd && bIndex < bEnd) {
		const cmp = fnCmp(aItem, bItem)
		if (cmp < 0) {
			if (onlyA) { onlyA.arr[onlyA.index++] = aItem }
			aItem = a[++aIndex]
		} else if (cmp === 0) {
			if (both) { both.arr[both.index++] = aItem }
			aItem = a[++aIndex]
			bItem = b[++bIndex]
		} else {
			if (onlyB) { onlyB.arr[onlyB.index++] = bItem }
			bItem = b[++bIndex]
		}
	}

	if (onlyA) {
		while (aIndex < aEnd) {
			onlyA.arr[onlyA.index++] = a[aIndex++]
		}
	}

	if (onlyB) {
		while (bIndex < bEnd) {
			onlyB.arr[onlyB.index++] = b[bIndex++]
		}
	}
}

const commWith = (a, b, fnCmp) => {
	const onlyA = { arr: [], index: 0 }
	const both = { arr: [], index: 0 }
	const onlyB = { arr: [], index: 0 }

	__comm(onlyA, both, onlyB, a, 0, a.length, b, 0, b.length, fnCmp)

	return {
		a: onlyA.arr,
		ab: both.arr,
		b: onlyB.arr,
	}
}

const commBy = (a, b, fnMap) => commWith(a, b, (x, y) => compare(fnMap(x), fnMap(y)))

const commByPure = (a, b, fnMap) => {
	let lastX = NaN
	let lastY = NaN
	let xValue = NaN
	let yValue = NaN
	return commWith(a, b, (x, y) => {
		if (x !== lastX) {
			lastX = x
			xValue = fnMap(x)
		}
		if (y !== lastY) {
			lastY = y
			yValue = fnMap(y)
		}
		return compare(xValue, yValue)
	})
}

const comm = (a, b) => commWith(a, b, compare)

module.exports = {
	__comm,
	commWith,
	commBy,
	commByPure,
	comm,
}
