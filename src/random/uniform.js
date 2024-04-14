const { MiddleSquareWeyl } = require('./seeded/middle-square-weyl')

const rng = new MiddleSquareWeyl(Math.floor(Math.random() * (2 ** 20)))

const uniform = () => rng.uniform()

module.exports = { uniform }
