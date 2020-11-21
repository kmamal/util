const { createTests } = require('./testing/test-cases-for-map')
const { sub } = require('../../operators')

createTests('b-tree', 'BTree', [ sub, 4 ])

createTests('b-tree', 'BTree', [ sub, 16 ])
