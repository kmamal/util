const { map } = require('../array/map')
const { empty$$$ } = require('../object/empty')
const { setOwn } = require('./own')

const PATTERN = /\[(?<key1>[^.\]]+)\]|\.?(?<key2>[^[.]+)/ug

const getKey = ({ groups }) => groups.key1 || groups.key2

const map$$$ = map.$$$


const _stepsCache = new Map()

const __makeSteps = (path) => {
	const cached = _stepsCache.get(path)
	if (cached) { return cached }
	const matches = [ ...path.matchAll(PATTERN) ]
	const res = map$$$(matches, getKey)
	_stepsCache.set(path, res)
	return res
}

const _step = (obj, key) => key === '__proto__' && !Object.hasOwn(obj, key)
	? undefined
	: obj[key]

const _shallowCopy = (x) => {
	if (x === null || typeof x !== 'object') { throw new TypeError(`can't set properties of ${x}`) }
	return Array.isArray(x) ? Array.from(x) : { ...x }
}

const __get = (obj, steps) => {
	let value = obj
	for (let i = 0; i < steps.length; i++) {
		value = _step(value, steps[i])
	}
	return value
}

const __set = (obj, steps, value) => {
	const { length } = steps
	const lastIndex = length - 1
	const lastStep = steps[lastIndex]

	let curr = obj
	for (let i = 0; i < lastIndex; i++) {
		const step = steps[i]
		curr = _step(curr, step)
	}

	const lastValue = _step(curr, lastStep)
	setOwn(curr, lastStep, value)
	return lastValue
}

const __setCopying = (obj, steps, value) => {
	const lastIndex = steps.length - 1

	let curr = obj
	for (let i = 0; i < lastIndex; i++) {
		const step = steps[i]
		const next = _shallowCopy(_step(curr, step))
		setOwn(curr, step, next)
		curr = next
	}

	setOwn(curr, steps[lastIndex], value)
}


const get = (obj, path) => {
	const steps = __makeSteps(path)
	return __get(obj, steps)
}


const set = (obj, path, value) => {
	const steps = __makeSteps(path)
	const res = { ...obj }
	__setCopying(res, steps, value)
	return res
}

const setTo = (dst, obj, path, value) => {
	const steps = __makeSteps(path)
	empty$$$(dst)
	Object.assign(dst, obj)
	__setCopying(dst, steps, value)
	return dst
}

const set$$$ = (obj, path, value) => {
	const steps = __makeSteps(path)
	__set(obj, steps, value)
	return obj
}

set.to = setTo
set.$$$ = set$$$


const _getterCache = new Map()

const getter = (path) => {
	const cached = _getterCache.get(path)
	if (cached) { return cached }

	const steps = __makeSteps(path)
	const res = (obj) => __get(obj, steps)

	_getterCache.set(path, res)
	return res
}


const _setterCache = new Map()

const setter = (path) => {
	const cached = _setterCache.get(path)
	if (cached) { return cached }

	const steps = __makeSteps(path)
	const res = (obj, value) => __set(obj, steps, value)

	_setterCache.set(path, res)
	return res
}


module.exports = {
	__makeSteps,
	__get,
	__set,
	get,
	set,
	getter,
	setter,
}
