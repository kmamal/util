const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const { __copy, __copyRight, __copyInplace, copy } = require('./copy')

testVariants("array.copy", copy, (t, f) => {
	t.equal(f([], []), [])
	t.equal(f([ 1 ], [ 2 ]), [ 2 ])
	t.equal(f([ 1, 2 ], [ 9 ]), [ 9, 2 ])
	t.equal(f([ 1, 2, 3 ], [ 4, 5, 6 ]), [ 4, 5, 6 ])
	t.equal(f([ 1, 2, 3, 4 ], [ 7, 8, 9 ], 1, 3, 1), [ 1, 8, 9, 4 ])
	t.equal(f([ 1, 2 ], [ 7, 8, 9 ], 0, 3, 1), [ 1, 7, 8, 9 ])
	t.equal(f([ 1, 2 ], [ 9 ], 0, 1, 3), [ 1, 2, undefined, 9 ])
	t.equal(f([ 1, 2 ], [ 9 ], 0, 0, 4), [ 1, 2, undefined, undefined ])
	const a = [ 1, 2, 3, 4, 5 ]
	t.equal(f(a, a, 0, 3, 2), [ 1, 2, 1, 2, 3 ])
})

test("array.__copy", (t) => {
	{
		const src = [ 'a', 1, 2, 3, 'b' ]
		const dst = [ 'x', 'x', 'x', 'x', 'x', 'x' ]
		__copy(dst, 2, src, 1, 4)
		t.equal(dst, [ 'x', 'x', 1, 2, 3, 'x' ])
		t.equal(src, [ 'a', 1, 2, 3, 'b' ])
	}

	{
		const dst = [ 'x', 'x', 'x' ]
		__copy(dst, 1, [ 'a', 1, 'b' ], 1, 2)
		t.equal(dst, [ 'x', 1, 'x' ])
	}

	{
		const dst = [ 'x', 'x' ]
		__copy(dst, 1, [ 'a', 1, 'b' ], 1, 1)
		t.equal(dst, [ 'x', 'x' ])
	}

	{
		const arr = [ 0, 1, 2, 3, 4, 5, 6 ]
		__copy(arr, 1, arr, 3, 6)
		t.equal(arr, [ 0, 3, 4, 5, 4, 5, 6 ])
	}
})

test("array.__copyRight", (t) => {
	{
		const src = [ 'a', 1, 2, 3, 'b' ]
		const dst = [ 'x', 'x', 'x', 'x', 'x', 'x' ]
		__copyRight(dst, 2, src, 1, 4)
		t.equal(dst, [ 'x', 'x', 1, 2, 3, 'x' ])
		t.equal(src, [ 'a', 1, 2, 3, 'b' ])
	}

	{
		const dst = [ 'x', 'x', 'x' ]
		__copyRight(dst, 1, [ 'a', 1, 'b' ], 1, 2)
		t.equal(dst, [ 'x', 1, 'x' ])
	}

	{
		const dst = [ 'x', 'x' ]
		__copyRight(dst, 1, [ 'a', 1, 'b' ], 1, 1)
		t.equal(dst, [ 'x', 'x' ])
	}

	{
		const arr = [ 0, 1, 2, 3, 4, 5, 6 ]
		__copyRight(arr, 3, arr, 1, 4)
		t.equal(arr, [ 0, 1, 2, 1, 2, 3, 6 ])
	}
})

test("array.__copyInplace", (t) => {
	{
		const arr = [ 0, 1, 2, 3, 4, 5, 6 ]
		__copyInplace(arr, 3, 1, 4)
		t.equal(arr, [ 0, 1, 2, 1, 2, 3, 6 ])
	}

	{
		const arr = [ 0, 1, 2, 3, 4, 5, 6 ]
		__copyInplace(arr, 1, 3, 6)
		t.equal(arr, [ 0, 3, 4, 5, 4, 5, 6 ])
	}

	{
		const arr = [ 0, 1, 2, 3, 4, 5, 6 ]
		__copyInplace(arr, 2, 1, 5)
		t.equal(arr, [ 0, 1, 1, 2, 3, 4, 6 ])
	}

	{
		const arr = [ 0, 1, 2, 3, 4, 5, 6 ]
		__copyInplace(arr, 4, 1, 3)
		t.equal(arr, [ 0, 1, 2, 3, 1, 2, 6 ])
	}

	{
		const arr = [ 0, 1, 2, 3, 4, 5, 6 ]
		__copyInplace(arr, 0, 4, 6)
		t.equal(arr, [ 4, 5, 2, 3, 4, 5, 6 ])
	}

	{
		const arr = [ 0, 1, 2, 3 ]
		__copyInplace(arr, 1, 1, 3)
		t.equal(arr, [ 0, 1, 2, 3 ])
	}

	{
		const arr = [ 0, 1, 2, 3 ]
		__copyInplace(arr, 2, 1, 2)
		t.equal(arr, [ 0, 1, 1, 3 ])
	}

	{
		const arr = [ 0, 1, 2, 3 ]
		__copyInplace(arr, 2, 1, 1)
		t.equal(arr, [ 0, 1, 2, 3 ])
	}

	{
		const arr = [ 0, 1, 2 ]
		__copyInplace(arr, 2, 0, 3)
		t.equal(arr, [ 0, 1, 0, 1, 2 ])
	}
})
