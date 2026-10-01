const { test } = require('@kmamal/testing')
const { unfold } = require('./unfold')

test("function.unfold", (t) => {
	t.equal(unfold((x) => x * 2, 0, 1), [])
	t.equal(unfold((x) => x * 2, 1, 1), [ 1 ])
	t.equal(unfold((x) => x * 2, 4, 1), [ 1, 2, 4, 8 ])
})
