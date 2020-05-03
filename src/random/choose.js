const { rand } = require('./rand')

const choose = (arr) => arr[rand(arr.length)]

module.exports = { choose }
