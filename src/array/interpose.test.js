const { test } = require('@kmamal/testing')
const { testVariants } = require('../testing/test-variants')
const {
	__interposeLeft,
	__interposeRight,
	__interpose,
	__interposeAllLeft,
	__interposeAllRight,
	__interposeAll,
	interpose,
	interposeAll,
} = require('./interpose')

testVariants("array.interpose", interpose, (t, f) => {
	t.equal(f([], 0), [])
	t.equal(f([ 1 ], 0), [ 1 ])
	t.equal(f([ 1, 2 ], 0), [ 1, 0, 2 ])
	t.equal(f([ 1, 2, 3 ], 0), [ 1, 0, 2, 0, 3 ])
})

testVariants("array.interposeAll", interposeAll, (t, f) => {
	t.equal(f([], [ 0 ]), [])
	t.equal(f([ 1 ], [ 0 ]), [ 1 ])
	t.equal(f([ 1, 2, 3 ], [ 0 ]), [ 1, 0, 2, 0, 3 ])
	t.equal(f([ 1, 2, 3 ], [ 8, 9 ]), [ 1, 8, 9, 2, 8, 9, 3 ])
})

test("array.__interposeLeft", (t) => {
	{
		const src = [ 'a', 1, 2, 3, 'b' ]
		const dst = [ 'x', 'x', 'x', 'x', 'x', 'x', 'x' ]
		t.equal(__interposeLeft(dst, 1, src, 1, 4, 0), 5)
		t.equal(dst, [ 'x', 1, 0, 2, 0, 3, 'x' ])
		t.equal(dst.slice(1, 6), interpose(src.slice(1, 4), 0))
		t.equal(src, [ 'a', 1, 2, 3, 'b' ])
	}

	{
		const dst = [ 'x', 'x', 'x' ]
		t.equal(__interposeLeft(dst, 1, [ 'a', 1, 'b' ], 1, 2, 0), 1)
		t.equal(dst, [ 'x', 1, 'x' ])
	}

	{
		const dst = [ 'x', 'x' ]
		t.equal(__interposeLeft(dst, 1, [ 'a', 'b' ], 1, 1, 0), 0)
		t.equal(dst, [ 'x', 'x' ])
	}
})

test("array.__interposeRight", (t) => {
	{
		const src = [ 'a', 1, 2, 3, 'b' ]
		const dst = [ 'x', 'x', 'x', 'x', 'x', 'x', 'x' ]
		t.equal(__interposeRight(dst, 1, src, 1, 4, 0), 5)
		t.equal(dst, [ 'x', 1, 0, 2, 0, 3, 'x' ])
		t.equal(src, [ 'a', 1, 2, 3, 'b' ])
	}

	{
		const arr = [ 'p', 1, 2, 3, 'z', 'z', 'z' ]
		t.equal(__interposeRight(arr, 1, arr, 1, 4, 0), 5)
		t.equal(arr, [ 'p', 1, 0, 2, 0, 3, 'z' ])
	}

	{
		const arr = [ 1, 2, 3, 'z', 'z', 'z', 'z', 'z' ]
		t.equal(__interposeRight(arr, 2, arr, 0, 3, 0), 5)
		t.equal(arr, [ 1, 2, 1, 0, 2, 0, 3, 'z' ])
	}

	{
		const arr = [ 'p', 1, 'z' ]
		t.equal(__interposeRight(arr, 1, arr, 1, 2, 0), 1)
		t.equal(arr, [ 'p', 1, 'z' ])
	}

	{
		const arr = [ 'p', 'z' ]
		t.equal(__interposeRight(arr, 1, arr, 1, 1, 0), 0)
		t.equal(arr, [ 'p', 'z' ])
	}
})

test("array.__interpose", (t) => {
	{
		const src = [ 'a', 1, 2, 3, 'b' ]
		const dst = [ 'x', 'x', 'x', 'x', 'x', 'x', 'x' ]
		__interpose(dst, 1, src, 1, 4, 0)
		t.equal(dst, [ 'x', 1, 0, 2, 0, 3, 'x' ])
		t.equal(src, [ 'a', 1, 2, 3, 'b' ])
	}

	{
		const arr = [ 1, 2, 3, 'z', 'z', 'z', 'z', 'z' ]
		__interpose(arr, 2, arr, 0, 3, 0)
		t.equal(arr, [ 1, 2, 1, 0, 2, 0, 3, 'z' ])
	}

	{
		const dst = [ 'x', 'x' ]
		__interpose(dst, 1, [ 'a', 'b' ], 1, 1, 0)
		t.equal(dst, [ 'x', 'x' ])
	}
})

test("array.__interposeAllLeft", (t) => {
	{
		const a = [ 'a', 1, 2, 3, 'b' ]
		const b = [ 'c', 8, 9, 'd' ]
		const dst = [ 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x' ]
		t.equal(__interposeAllLeft(dst, 1, a, 1, 4, b, 1, 3), 7)
		t.equal(dst, [ 'x', 1, 8, 9, 2, 8, 9, 3, 'x' ])
		t.equal(dst.slice(1, 8), interposeAll(a.slice(1, 4), b.slice(1, 3)))
		t.equal(a, [ 'a', 1, 2, 3, 'b' ])
		t.equal(b, [ 'c', 8, 9, 'd' ])
	}

	{
		const dst = [ 'x', 'x', 'x', 'x', 'x' ]
		t.equal(__interposeAllLeft(dst, 1, [ 'a', 1, 2, 3, 'b' ], 1, 4, [ 'c', 'd' ], 1, 1), 3)
		t.equal(dst, [ 'x', 1, 2, 3, 'x' ])
	}

	{
		const dst = [ 'x', 'x', 'x' ]
		t.equal(__interposeAllLeft(dst, 1, [ 'a', 1, 'b' ], 1, 2, [ 'c', 8, 'd' ], 1, 2), 1)
		t.equal(dst, [ 'x', 1, 'x' ])
	}

	{
		const dst = [ 'x', 'x' ]
		t.equal(__interposeAllLeft(dst, 1, [ 'a', 'b' ], 1, 1, [ 'c', 8, 'd' ], 1, 2), 0)
		t.equal(dst, [ 'x', 'x' ])
	}
})

test("array.__interposeAllRight", (t) => {
	{
		const a = [ 'a', 1, 2, 3, 'b' ]
		const b = [ 'c', 8, 9, 'd' ]
		const dst = [ 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x' ]
		t.equal(__interposeAllRight(dst, 1, a, 1, 4, b, 1, 3), 7)
		t.equal(dst, [ 'x', 1, 8, 9, 2, 8, 9, 3, 'x' ])
		t.equal(a, [ 'a', 1, 2, 3, 'b' ])
		t.equal(b, [ 'c', 8, 9, 'd' ])
	}

	{
		const arr = [ 'p', 1, 2, 3, 'z', 'z', 'z', 'z', 'z' ]
		t.equal(__interposeAllRight(arr, 1, arr, 1, 4, [ 'c', 8, 9, 'd' ], 1, 3), 7)
		t.equal(arr, [ 'p', 1, 8, 9, 2, 8, 9, 3, 'z' ])
	}

	{
		const arr = [ 1, 2, 3, 'z', 'z', 'z', 'z', 'z', 'z', 'z' ]
		t.equal(__interposeAllRight(arr, 2, arr, 0, 3, [ 'c', 8, 9, 'd' ], 1, 3), 7)
		t.equal(arr, [ 1, 2, 1, 8, 9, 2, 8, 9, 3, 'z' ])
	}

	{
		const arr = [ 'p', 1, 2, 3, 'z' ]
		t.equal(__interposeAllRight(arr, 1, arr, 1, 4, [ 'c', 'd' ], 1, 1), 3)
		t.equal(arr, [ 'p', 1, 2, 3, 'z' ])
	}

	{
		const arr = [ 'p', 1, 'z' ]
		t.equal(__interposeAllRight(arr, 1, arr, 1, 2, [ 'c', 8, 'd' ], 1, 2), 1)
		t.equal(arr, [ 'p', 1, 'z' ])
	}

	{
		const arr = [ 'p', 'z' ]
		t.equal(__interposeAllRight(arr, 1, arr, 1, 1, [ 'c', 8, 'd' ], 1, 2), 0)
		t.equal(arr, [ 'p', 'z' ])
	}
})

test("array.__interposeAll", (t) => {
	{
		const a = [ 'a', 1, 2, 3, 'b' ]
		const b = [ 'c', 8, 9, 'd' ]
		const dst = [ 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x' ]
		__interposeAll(dst, 1, a, 1, 4, b, 1, 3)
		t.equal(dst, [ 'x', 1, 8, 9, 2, 8, 9, 3, 'x' ])
		t.equal(a, [ 'a', 1, 2, 3, 'b' ])
	}

	{
		const arr = [ 1, 2, 3, 'z', 'z', 'z', 'z', 'z', 'z', 'z' ]
		__interposeAll(arr, 2, arr, 0, 3, [ 'c', 8, 9, 'd' ], 1, 3)
		t.equal(arr, [ 1, 2, 1, 8, 9, 2, 8, 9, 3, 'z' ])
	}

	{
		const dst = [ 'x', 'x' ]
		__interposeAll(dst, 1, [ 'a', 'b' ], 1, 1, [ 'c', 8, 'd' ], 1, 2)
		t.equal(dst, [ 'x', 'x' ])
	}
})

test("array.__interposeAllRight shifted with empty separator", (t) => {
	const arr = [ 1, 2, 3, 'z', 'z' ]
	t.equal(__interposeAllRight(arr, 1, arr, 0, 3, [ 'c', 'd' ], 1, 1), 3)
	t.equal(arr, [ 1, 1, 2, 3, 'z' ])
})

test("array.__interposeAll shifted with empty separator", (t) => {
	const arr = [ 1, 2, 3, 'z', 'z' ]
	__interposeAll(arr, 1, arr, 0, 3, [ 'c', 'd' ], 1, 1)
	t.equal(arr, [ 1, 1, 2, 3, 'z' ])
})

test("array.__interpose return value", (t) => {
	t.equal(__interpose([ 'x', 'x', 'x', 'x', 'x', 'x', 'x' ], 1, [ 'a', 1, 2, 3, 'b' ], 1, 4, 0), 5)
	const arr = [ 1, 2, 3, 'z', 'z', 'z', 'z', 'z' ]
	t.equal(__interpose(arr, 2, arr, 0, 3, 0), 5)
	t.equal(__interpose([ 'x', 'x' ], 1, [ 'a', 'b' ], 1, 1, 0), 0)
})

test("array.__interposeAll return value", (t) => {
	t.equal(__interposeAll([ 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x' ], 1, [ 'a', 1, 2, 3, 'b' ], 1, 4, [ 'c', 8, 9, 'd' ], 1, 3), 7)
	const arr = [ 1, 2, 3, 'z', 'z', 'z', 'z', 'z', 'z', 'z' ]
	t.equal(__interposeAll(arr, 2, arr, 0, 3, [ 'c', 8, 9, 'd' ], 1, 3), 7)
	t.equal(__interposeAll([ 'x', 'x' ], 1, [ 'a', 'b' ], 1, 1, [ 'c', 8, 'd' ], 1, 2), 0)
})
