const { keys: getKeys } = require('./keys')
const { sort } = require('../array/sort')
const { differenceSorted } = require('../array/difference')

const pick$$$ = (obj, keys) => {
	const existingKeys = sort.$$$(getKeys(obj))
	const pickedKeys = sort(keys)
	const omittedKeys = differenceSorted(existingKeys, pickedKeys)
	return omit$$$(obj, omittedKeys)
}

const pick = (obj, keys) => {
	const res = {}
	for (const key of keys) {
		res[key] = obj[key]
	}
	return res
}

pick.$$$ = pick$$$

const omit$$$ = (obj, keys) => {
	for (const key of keys) {
		delete obj[key]
	}
	return obj
}

const omit = (obj, keys) => {
	const existingKeys = sort.$$$(getKeys(obj))
	const omittedKeys = sort(keys)
	const pickedKeys = differenceSorted(existingKeys, omittedKeys)
	return pick(obj, pickedKeys)
}

omit.$$$ = omit$$$

module.exports = {
	pick,
	omit,
}
