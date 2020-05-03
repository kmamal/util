const { range } = require('../../range')

const _path_part_regex = /(?:\[(?<key1>[^\]]+)\]|(?:\.?(?<key2>[^.]+)))/ug
const toPath = (string) => [ ...string.matchAll(_path_part_regex) ]
	.map(({ groups }) => groups.key1 || groups.key2)

const _getByPath = (array) => (obj) => {
	let value = obj
	for (const key of array) {
		value = obj[key]
	}
	return value
}

const _getByString = (string) => _getByPath(toPath(string))

const _get = (prop) => typeof prop === 'string'
	? _getByString(prop)
	: _getByPath(prop)

const iteratee = (iter) => typeof iter === 'function' ? iter : _get(iter)

const tap = (fn) => (x) => { fn(x) }

const invoke = (...args) => (fn) => fn(...args)

const _for = (...args) => (fn) => {
	for (const i of range(...args)) { fn(i) }
}

module.exports = {
	_get,
	toPath,
	iteratee,
	tap,
	invoke,
	for: _for,
	// while
	// until
}
