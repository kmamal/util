const { fromFactory: fromFactory1d } = require('..')

const array = (x, y) => fromFactory1d(y, () => Array(x))

const fromFactory = (x, y, factory) => fromFactory1d(y, (j) => fromFactory1d(x, (i) => factory(i, j)))

module.exports = {
	array,
	fromFactory,
}
