
const _stepRegex = /\[(?<key1>[^.\]+])\]|\.?(?<key2>[^[.]+)/ug

const _makeSteps = (path) => [ ...path.matchAll(_stepRegex) ]
	.map(({ groups }) => groups.key1 || groups.key2)

const _get = (obj, steps) => {
	let value = obj
	for (const step of steps) {
		value = value[step]
	}
	return value
}

const get = (obj, path) => {
	const steps = Array.isArray(path) ? path : _makeSteps(path)
	return _get(obj, steps)
}

const _set = (_obj, steps, value) => {
	const { length } = steps
	const lastIndex = length - 1
	const lastStep = steps[lastIndex]

	let obj = _obj
	for (let i = 0; i < lastIndex; i++) {
		const step = steps[i]
		obj = obj[step]
	}

	const lastValue = obj[lastStep]
	obj[lastStep] = value
	return lastValue
}

const set = (obj, path, value) => {
	const steps = Array.isArray(path) ? path : _makeSteps(path)
	return _set(obj, steps, value)
}

module.exports = {
	_get,
	get,
	_set,
	set,
}
