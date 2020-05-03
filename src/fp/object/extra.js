const { _get, iteratee } = require('../util')

const get = _get

const getOr = (path, value) => {
	const getter = get(path)
	return (obj) => getter(obj) || value
}

const set = (path, value) => (obj) => {
	//
}

const defaults = (values) => (obj) => ({ ...values, ...obj })

const pick = (keys) => (obj) => {
	const res = {}
	for (const key of keys) {
		res[key] = obj[key]
	}
	return res
}

const omit = (keys) => (obj) => {
	const res = {}
	for (const key of Object.keys(obj)) {
		if (keys.includes(key)) { continue }
		res[key] = obj[key]
	}
	return res
}

const mapValues = (fn) => {
	const iter = iteratee(fn)
	return (obj) => {
		const res = {}
		for (const key of Object.keys(obj)) {
			res[key] = iter(obj[key])
		}
		return res
	}
}

module.exports = {
	get,
	getOr,
	set,
	defaults,
	pick,
	omit,
	mapValues,
}
