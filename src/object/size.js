const { enumerateOwnKeys } = require('./own')

const size = (obj) => enumerateOwnKeys(obj).length

module.exports = { size }
