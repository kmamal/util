const { test } = require('@kmamal/testing')
const { fillWith } = require('./fill-with')

test("array.fillWith", (t) => {
	t.equal(fillWith([], () => {}), [])
	t.equal(fillWith(new Array(3), () => 5), [ 5, 5, 5 ])
	t.equal(fillWith(new Array(3), (i) => i), [ 0, 1, 2 ])
})
