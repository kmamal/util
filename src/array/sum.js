const { reduce } = require('./reduce')
const { identity } = require('../function/identity')

const sumBy = (arr, fn) => reduce(arr, (a, x) => a + fn(x), 0)

const sum = (arr) => sumBy(arr, identity)

module.exports = {
	sumBy,
	sum,
}
