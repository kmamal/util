
const _isPlainPrototype = (proto) => proto === Object.prototype || proto === null

const _isEqualObjects = (a, b, fnEq, seen) => {
	const aProto = Object.getPrototypeOf(a)
	const bProto = Object.getPrototypeOf(b)
	if (aProto !== bProto && !(_isPlainPrototype(aProto) && _isPlainPrototype(bProto))) { return false }

	// Array
	const aIsArray = Array.isArray(a)
	const bIsArray = Array.isArray(b)
	if (aIsArray !== bIsArray) { return false }

	if (aIsArray) {
		const aLength = a.length
		const bLength = b.length
		if (aLength !== bLength) { return false }

		for (let i = 0; i < aLength; i++) {
			if (!_isEqualWith(a[i], b[i], fnEq, seen)) { return false }
		}
		return true
	}

	// Map
	const aIsMap = a instanceof Map
	const bIsMap = b instanceof Map
	if (aIsMap !== bIsMap) { return false }
	if (aIsMap) {
		if (a.size !== b.size) { return false }

		const bEntries = new Set(b.entries())
		forEachA:
		for (const [ aKey, aValue ] of a.entries()) {
			for (const bEntry of bEntries.values()) {
				if (_isEqualWith(aKey, bEntry[0], fnEq, seen) && _isEqualWith(aValue, bEntry[1], fnEq, seen)) {
					bEntries.delete(bEntry)
					continue forEachA
				}
			}
			return false
		}
		return true
	}

	// Set
	const aIsSet = a instanceof Set
	const bIsSet = b instanceof Set
	if (aIsSet !== bIsSet) { return false }
	if (aIsSet) {
		if (a.size !== b.size) { return false }

		const bValuesSet = new Set(b.values())
		forEachA:
		for (const aValue of a.values()) {
			for (const bValue of bValuesSet.values()) {
				if (_isEqualWith(aValue, bValue, fnEq, seen)) {
					bValuesSet.delete(bValue)
					continue forEachA
				}
			}
			return false
		}
		return true
	}

	if (a instanceof Date) {
		const aTime = a.getTime()
		const bTime = b.getTime()
		if (aTime !== bTime && !(Number.isNaN(aTime) && Number.isNaN(bTime))) { return false }
	}

	if (a instanceof RegExp) {
		if (a.source !== b.source || a.flags !== b.flags) { return false }
	}

	if (a instanceof Number || a instanceof String || a instanceof Boolean || a instanceof BigInt || a instanceof Symbol) {
		if (!_isEqualWith(a.valueOf(), b.valueOf(), fnEq, seen)) { return false }
	}

	// Object
	const aKeys = Object.keys(a)
	const bKeys = Object.keys(b)
	if (aKeys.length !== bKeys.length) { return false }

	for (let i = 0; i < aKeys.length; i++) {
		const aKey = aKeys[i]
		if (!Object.hasOwn(b, aKey) || !_isEqualWith(a[aKey], b[aKey], fnEq, seen)) { return false }
	}
	return true
}

const _isEqualWith = (a, b, fnEq, _seen) => {
	const res = fnEq(a, b)
	if (res !== undefined) { return res }

	// Primitive types and functions
	if (a === b) { return true }
	if (Number.isNaN(a) && Number.isNaN(b)) { return true }
	if (a === null || b === null) { return false } // Since `typeof null === 'object'`, but we want to handle it here

	const aType = typeof a
	const bType = typeof b
	if (aType !== bType) { return false }

	if (aType !== 'object') { return false } // Should have been handled in `a === b`

	const seen = _seen ?? new Map()

	let bs = seen.get(a)
	if (bs === undefined) {
		bs = new Set()
		seen.set(a, bs)
	}
	else if (bs.has(b)) {
		return true
	}

	bs.add(b)
	const result = _isEqualObjects(a, b, fnEq, seen)
	bs.delete(b)
	return result
}

const isEqualWith = (a, b, fnEq) => _isEqualWith(a, b, fnEq, null)

const isEqual = (a, b) => isEqualWith(a, b, () => undefined)

module.exports = {
	isEqualWith,
	isEqual,
}
