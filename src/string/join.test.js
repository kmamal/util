const { test } = require('@kmamal/testing')
const { join } = require('./join')

test("array.join", (t) => {
	t.equal(join([], '.'), '')
	t.equal(join([ 1 ], '.'), '1')
	t.equal(join([ 1, 2, 3 ], '.'), '1.2.3')
})
