const { createTests } = require('./testing/test-cases-for-map')
const { sub } = require('../operators')

createTests('node-tree', 'NodeTree', [ sub ])
