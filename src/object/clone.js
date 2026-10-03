const { setOwn, enumerateOwnKeys } = require('./own')

const _typedArrayConstructors = [
	Int8Array,
	Uint8Array,
	Uint8ClampedArray,
	Int16Array,
	Uint16Array,
	Int32Array,
	Uint32Array,
	typeof Float16Array === 'undefined' ? null : Float16Array,
	Float32Array,
	Float64Array,
	BigInt64Array,
	BigUint64Array,
].filter(Boolean)

const _uncloneableConstructors = [
	Promise,
	WeakMap,
	WeakSet,
	typeof WeakRef === 'undefined' ? null : WeakRef,
	typeof FinalizationRegistry === 'undefined' ? null : FinalizationRegistry,
].filter(Boolean)

const _errorKeys = [ 'message', 'cause', 'errors' ]

const _isPlainPrototype = (proto) => proto === Object.prototype || proto === null

const _setPrototype = (res, proto) => {
	if (Object.getPrototypeOf(res) !== proto) { Object.setPrototypeOf(res, proto) }
}

const _copyProps = (res, x, cache, recurse) => {
	const keys = enumerateOwnKeys(x)
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		setOwn(res, key, recurse(x[key], cache, recurse))
	}
}

const _copyExtraProps = (res, x, cache, recurse) => {
	const keys = enumerateOwnKeys(x)
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		if (Object.hasOwn(res, key)) { continue }
		setOwn(res, key, recurse(x[key], cache, recurse))
	}
}

const _cloneBuffer = (x, Constructor) => {
	if (x.detached) {
		const res = new ArrayBuffer(0)
		res.transfer()
		return res
	}

	const { byteLength } = x
	const res = x.resizable || x.growable
		? new Constructor(byteLength, { maxByteLength: x.maxByteLength })
		: new Constructor(byteLength)
	new Uint8Array(res).set(new Uint8Array(x))
	return res
}

const _cloneError = (x, cache, recurse) => {
	const res = new Error()
	cache.set(x, res)
	for (let i = 0; i < _errorKeys.length; i++) {
		const key = _errorKeys[i]
		if (!Object.hasOwn(x, key)) { continue }
		Object.defineProperty(res, key, {
			value: recurse(x[key], cache, recurse),
			writable: true,
			enumerable: Object.prototype.propertyIsEnumerable.call(x, key),
			configurable: true,
		})
	}
	Object.defineProperty(res, 'stack', {
		value: x.stack,
		writable: true,
		enumerable: false,
		configurable: true,
	})
	return res
}

const _cloneBuiltin = (x, cache, recurse) => {
	if (x instanceof Map) {
		const res = new Map()
		cache.set(x, res)
		for (const entry of x.entries()) {
			res.set(recurse(entry[0], cache, recurse), recurse(entry[1], cache, recurse))
		}
		return res
	}

	if (x instanceof Set) {
		const res = new Set()
		cache.set(x, res)
		for (const value of x.values()) {
			res.add(recurse(value, cache, recurse))
		}
		return res
	}

	if (x instanceof Date) {
		const res = new Date(x.getTime())
		cache.set(x, res)
		return res
	}

	if (x instanceof RegExp) {
		const res = new RegExp(x.source, x.flags)
		res.lastIndex = x.lastIndex
		cache.set(x, res)
		return res
	}

	if (x instanceof ArrayBuffer) {
		const res = _cloneBuffer(x, ArrayBuffer)
		cache.set(x, res)
		return res
	}

	if (typeof SharedArrayBuffer !== 'undefined' && x instanceof SharedArrayBuffer) {
		const res = _cloneBuffer(x, SharedArrayBuffer)
		cache.set(x, res)
		return res
	}

	if (x instanceof DataView) {
		const buffer = recurse(x.buffer, cache, recurse)
		const res = new DataView(buffer, x.byteOffset, x.byteLength)
		cache.set(x, res)
		return res
	}

	if (x instanceof Number || x instanceof String || x instanceof Boolean || x instanceof BigInt || x instanceof Symbol) {
		const res = Object(x.valueOf())
		cache.set(x, res)
		return res
	}

	if (x instanceof Error) {
		return _cloneError(x, cache, recurse)
	}

	return null
}

const _clone = (x, cache, recurse) => {
	if (typeof x === 'function') { throw new Error("can't clone functions") }

	if (x === null || typeof x !== 'object') { return x }

	if (cache.has(x)) { return cache.get(x) }

	const proto = Object.getPrototypeOf(x)
	if (Array.isArray(x)) {
		const { length } = x
		const res = new Array(length)
		cache.set(x, res)
		for (let i = 0; i < length; i++) {
			res[i] = recurse(x[i], cache, recurse)
		}
		if (proto !== Array.prototype) { Object.setPrototypeOf(res, proto) }
		return res
	}

	if (_isPlainPrototype(proto)) {
		const res = Object.create(proto)
		cache.set(x, res)
		_copyProps(res, x, cache, recurse)
		return res
	}

	if (ArrayBuffer.isView(x) && !(x instanceof DataView)) {
		const Constructor = _typedArrayConstructors.find((C) => x instanceof C)
		const buffer = recurse(x.buffer, cache, recurse)
		const res = new Constructor(buffer, x.byteOffset, x.length)
		cache.set(x, res)
		_setPrototype(res, proto)
		return res
	}

	const builtin = _cloneBuiltin(x, cache, recurse)
	if (builtin !== null) {
		_setPrototype(builtin, proto)
		_copyExtraProps(builtin, x, cache, recurse)
		return builtin
	}

	for (let i = 0; i < _uncloneableConstructors.length; i++) {
		const Constructor = _uncloneableConstructors[i]
		if (x instanceof Constructor) { throw new Error(`can't clone ${Constructor.name}`) }
	}

	const res = Object.create(proto)
	cache.set(x, res)
	_copyProps(res, x, cache, recurse)
	return res
}

const cloneWith = (x, fnClone) => {
	const fnRecurse = (y, cache) => {
		const custom = fnClone(y)
		if (custom !== undefined) { return custom }
		return _clone(y, cache, fnRecurse)
	}
	return fnRecurse(x, new Map())
}

const clone = (x) => _clone(x, new Map(), _clone)

module.exports = {
	__uncloneableConstructors: _uncloneableConstructors,
	cloneWith,
	clone,
}
