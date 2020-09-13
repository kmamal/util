const { scan } = require('./scan')
const { identity } = require('../function/identity')

const prefixSumsBy$$$ = (arr, fn) => scan.$$$(arr, (a, x) => a + fn(x), 0)

const prefixSumsBy = (arr, fn) => scan(arr, (a, x) => a + fn(x), 0)

prefixSumsBy.$$$ = prefixSumsBy$$$

const prefixSums$$$ = (arr) => prefixSumsBy$$$(arr, identity)

const prefixSums = (arr) => prefixSumsBy(arr, identity)

prefixSums.$$$ = prefixSums$$$

module.exports = {
	prefixSumsBy,
	prefixSums,
}
