const { sort } = require('../array/sort')
const { differenceSorted } = require('../array/difference')
const { pick } = require('./pick')

const omit = (obj, keys) => {
	const a = sort.$$$(Object.keys(obj))
	const b = sort(keys)
	const c = differenceSorted(a, b)
	return pick(obj, c)
}

module.exports = { omit }
