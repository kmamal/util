const { noop } = require('../function/noop')

const isEqualWith = (a, b, fnCmp) => {
	const cmp = fnCmp(a, b)
	if (cmp !== undefined) { return cmp }

	// Primitive types and functions
	if (a === b) { return true }
	if (Number.isNaN(a) && Number.isNaN(b)) { return true }
	if (a === null || b === null) { return false } // Since `typeof null === 'object'`, but we want to handle it here

	const aType = typeof a
	const bType = typeof b
	if (aType !== bType) { return false }

	if (aType !== 'object') { return false } // Should have been handled in `a === b`

	// Array
	const aIsArray = Array.isArray(a)
	const bIsArray = Array.isArray(b)
	if (aIsArray !== bIsArray) { return false }

	if (aIsArray) {
		const aLength = a.length
		const bLength = b.length
		if (aLength !== bLength) { return false }

		for (let i = 0; i < aLength; i++) {
			if (!isEqual(a[i], b[i])) { return false }
		}
		return true
	}

	// Object
	for (const key of Object.keys(a)) {
		if (!isEqual(a[key], b[key])) { return false }
	}

	for (const key of Object.keys(b)) {
		if (!isEqual(a[key], b[key])) { return false }
	}

	return true
}

const isEqual = (a, b) => isEqualWith(a, b, noop)

module.exports = {
	isEqualWith,
	isEqual,
}
