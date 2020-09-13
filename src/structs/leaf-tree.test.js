const { createTests } = require('./testing/test-cases-for-map')
const { sub } = require('../operators')

createTests('leaf-tree', 'LeafTree', [ sub ])
