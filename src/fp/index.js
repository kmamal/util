const base = require('./base')
const util = require('./util')
const array = require('./array')
const operators = require('./operators')
const promise = require('./promise')

module.exports = {
	...base,

	util,
	array,
	operators,
	promise,

	...util,
	...array,
	...operators,
}
