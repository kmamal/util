
const _step_regex = /\[(?<key1>[^\]]+)\]|\.?(?<key2>[^.]+)/ug

const _makeSteps = (path) => [ ...path.matchAll(_step_regex) ]
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
	const last_index = length - 1
	const last_step = steps[last_index]

	let obj = _obj
	for (let i = 0; i < last_index; i++) {
		const step = steps[i]
		obj = obj[step]
	}

	const last_value = obj[last_step]
	obj[last_step] = value
	return last_value
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
