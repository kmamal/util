const { test } = require('@xyz/testing')
const { join } = require('.')

test("array.join", (t) => {
	t.equal(join([], '.'), '')
	t.equal(join([ 1 ], '.'), '1')
	t.equal(join([ 1, 2, 3 ], '.'), '1.2.3')
})
