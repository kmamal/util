const { hasOwn, enumerateOwnKeys } = require('./own')
const { __uncloneableConstructors } = require('./clone')

const _errorKeys = [ 'message', 'cause', 'errors' ]

const _isPlainPrototype = (proto) => proto === Object.prototype || proto === null

const _isEqualBytes = (a, b) => {
	const { length } = a
	if (length !== b.length) { return false }
	for (let i = 0; i < length; i++) {
		if (a[i] !== b[i]) { return false }
	}
	return true
}

const _isEqualBuffers = (a, b) => {
	if (a.detached || b.detached) { return a.detached === b.detached }
	return _isEqualBytes(new Uint8Array(a), new Uint8Array(b))
}

const _isEqualProps = (a, b, fnEq, seen) => {
	const aKeys = enumerateOwnKeys(a)
	const bKeys = enumerateOwnKeys(b)
	if (aKeys.length !== bKeys.length) { return false }

	for (let i = 0; i < aKeys.length; i++) {
		const aKey = aKeys[i]
		if (!hasOwn(b, aKey) || !_isEqualWith(a[aKey], b[aKey], fnEq, seen)) { return false }
	}
	return true
}

const _isEqualBuiltins = (a, b, fnEq, seen) => {
	// Map
	if (a instanceof Map) {
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
	if (a instanceof Set) {
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
		return aTime === bTime || (Number.isNaN(aTime) && Number.isNaN(bTime))
	}

	if (a instanceof RegExp) {
		return a.source === b.source && a.flags === b.flags
	}

	if (a instanceof ArrayBuffer || (typeof SharedArrayBuffer !== 'undefined' && a instanceof SharedArrayBuffer)) {
		return _isEqualBuffers(a, b)
	}

	if (a instanceof DataView) {
		return _isEqualBytes(
			new Uint8Array(a.buffer, a.byteOffset, a.byteLength),
			new Uint8Array(b.buffer, b.byteOffset, b.byteLength),
		)
	}

	if (a instanceof Number || a instanceof String || a instanceof Boolean || a instanceof BigInt || a instanceof Symbol) {
		return _isEqualWith(a.valueOf(), b.valueOf(), fnEq, seen)
	}

	if (a instanceof Error) {
		for (let i = 0; i < _errorKeys.length; i++) {
			const key = _errorKeys[i]
			const aHas = Object.hasOwn(a, key)
			if (aHas !== Object.hasOwn(b, key)) { return false }
			if (aHas && !_isEqualWith(a[key], b[key], fnEq, seen)) { return false }
		}
		return true
	}

	return true
}

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

	// Object
	if (_isPlainPrototype(aProto)) { return _isEqualProps(a, b, fnEq, seen) }

	if (ArrayBuffer.isView(a) && !(a instanceof DataView)) {
		const { length } = a
		if (length !== b.length) { return false }

		for (let i = 0; i < length; i++) {
			if (!_isEqualWith(a[i], b[i], fnEq, seen)) { return false }
		}
		return true
	}

	for (let i = 0; i < __uncloneableConstructors.length; i++) {
		if (a instanceof __uncloneableConstructors[i]) { return false }
	}

	if (!_isEqualBuiltins(a, b, fnEq, seen)) { return false }

	return _isEqualProps(a, b, fnEq, seen)
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
