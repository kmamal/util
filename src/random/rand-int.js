const { rand } = require('./rand')

const randInt = (a, b) => rand(b - a) + a

module.exports = { randInt }
