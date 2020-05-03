const { random } = require('./random')

const rand = (n) => Math.floor(random() * n)

module.export = { rand }
