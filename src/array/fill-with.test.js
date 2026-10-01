const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __fillWith, fillWith } = require('./fill-with')

testVariants("array.fillWith", fillWith, (t, f) => {
	t.equal(f([], () => {}), [])
	t.equal(f(new Array(3), () => 5), [ 5, 5, 5 ])
	t.equal(f(new Array(3), (i) => i), [ 0, 1, 2 ])
	t.equal(f([ 1, 2, 3 ], () => 0, 1), [ 1, 0, 0 ])
	t.equal(f([ 1, 2, 3, 4 ], () => 0, 1, 3), [ 1, 0, 0, 4 ])
	t.equal(f([ 1, 2, 3, 4 ], (i) => i, 1, 3), [ 1, 1, 2, 4 ])
	t.equal(f([ 1, 2, 3, 4 ], (i) => i * 10, -2), [ 1, 2, 20, 30 ])
})

test("array.__fillWith", (t) => {
	{
		const arr = [ 1, 2, 3, 4, 5 ]
		__fillWith(arr, 1, 4, (i) => i * 10)
		t.equal(arr, [ 1, 10, 20, 30, 5 ])
	}

	{
		const arr = [ 1, 2, 3 ]
		__fillWith(arr, 1, 2, () => 0)
		t.equal(arr, [ 1, 0, 3 ])
	}

	{
		const arr = [ 1, 2, 3 ]
		__fillWith(arr, 1, 1, () => 0)
		t.equal(arr, [ 1, 2, 3 ])
	}

	{
		const arr = [ 1, 2 ]
		__fillWith(arr, 1, 3, (i) => i)
		t.equal(arr, [ 1, 1, 2 ])
	}
})
