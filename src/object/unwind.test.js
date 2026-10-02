const { test } = require('@kmamal/testing')
const { unwind, unwindWith } = require('./unwind')
const { cloneWith } = require('./clone')

test("object.unwind", (t) => {
	t.equal(unwind({ a: [ 1, 2 ], b: 3 }, 'a'), [ { a: 1, b: 3 }, { a: 2, b: 3 } ])
	t.equal(unwind({ a: [], b: 3 }, 'a'), [])
	t.equal(unwind({ x: { a: [ 1, 2 ] }, b: 3 }, 'x.a'), [
		{ x: { a: 1 }, b: 3 },
		{ x: { a: 2 }, b: 3 },
	])
	t.equal(unwind({ x: [ { a: [ 1, 2 ] } ] }, 'x[0].a'), [
		{ x: [ { a: 1 } ] },
		{ x: [ { a: 2 } ] },
	])
})

test("object.unwind copies are independent", (t) => {
	const obj = { a: [ 1, 2 ], b: { c: 3 } }
	const res = unwind(obj, 'a')
	t.ok(res[0].b !== obj.b)
	t.ok(res[0].b !== res[1].b)
	t.equal(obj, { a: [ 1, 2 ], b: { c: 3 } })
})

test("object.unwind restores input on error", (t) => {
	const f = () => 1
	const obj = { a: [ 1, 2 ], f }
	t.throws(() => unwind(obj, 'a'))
	t.equal(obj.a, [ 1, 2 ])
	t.equal(obj.f, f)
})

test("object.unwindWith", (t) => {
	const f = () => 1
	const keepFunctions = (x) => typeof x === 'function' ? x : undefined
	const res = unwindWith({ a: [ 1, 2 ], f }, 'a', (x) => cloneWith(x, keepFunctions))
	t.equal(res.map((x) => x.a), [ 1, 2 ])
	t.ok(res.every((x) => x.f === f))

	const seen = []
	unwindWith({ a: [ 1, 2 ], b: 3 }, 'a', (x) => {
		seen.push({ ...x })
		return { ...x }
	})
	t.equal(seen, [ { a: null, b: 3 }, { a: null, b: 3 } ])
})
