const { test } = require('@kmamal/testing')
const { memoize } = require('./memoize')

test("function.memoize", (t) => {
	let calls = 0
	const memoized = memoize((x) => {
		calls += 1
		return x * 2
	})
	t.equal(memoized(2), 4)
	t.equal(memoized(2), 4)
	t.equal(calls, 1)
	t.ok(memoized.cache instanceof Map)
})

test("function.memoize With options", (t) => {
	const memoized = memoize((x, y) => x + y, { resolve: (x, y) => `${x},${y}` })
	t.equal(memoized(1, 2), 3)
	t.equal(memoized(1, 3), 4)
	t.ok(memoized.cache instanceof Map)
})

test("function.memoize Custom cache", (t) => {
	const memoized = memoize((x) => ({ x }), { constructor: WeakMap })
	const key = {}
	const first = memoized(key)
	const second = memoized(key)
	t.ok(first === second)
	t.ok(memoized.cache instanceof WeakMap)
})
