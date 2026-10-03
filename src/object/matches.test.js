const { test } = require('@kmamal/testing')
const { matches, matchesWith } = require('./matches')

test('object.matches', (t) => {
	t.ok(matches({}, {}))
	t.ok(matches({ a: 1, b: 2 }, {}))
	t.ok(matches({ a: 1, b: 2 }, { a: 1 }))
	t.ok(matches({ a: 1, b: 2 }, { b: 2 }))
	t.ok(matches({ a: 1, b: 2 }, { a: 1, b: 2 }))
	t.ok(!matches({ a: 1, b: 2 }, { c: undefined }))
	t.ok(!matches({ a: 1, b: 2 }, { a: 2 }))
	t.ok(!matches({ a: 1, b: 2 }, { b: 1 }))
	t.ok(!matches({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 }))

	t.ok(matches({ a: 1, b: { c: 3, d: 4 } }, { b: { c: 3 } }))
})

test('object.matchesWith', (t) => {
	t.ok(matchesWith(
		{ a: 1, b: 2, c: 3 },
		{ a: 1, b: 2, c: 4 },
		(a, b, key) => key && (key === 'c' ? true : a === b),
	))
	t.ok(!matchesWith(
		{ a: 1, b: 2, c: 3 },
		{ a: 2, b: 2, c: 4 },
		(a, b, key) => key && (key === 'c' ? true : a === b),
	))
})

test("object.matches symbols", (t) => {
	const s = Symbol('s')
	t.ok(matches({ a: 1, [s]: 2 }, { [s]: 2 }))
	t.ok(!matches({ a: 1, [s]: 2 }, { [s]: 3 }))
	t.ok(!matches({ a: 1 }, { [s]: 2 }))
})

test("object.matches cycles", (t) => {
	const a = { x: 1, y: 2 }
	a.self = a
	const p = { x: 1 }
	p.self = p
	t.ok(matches(a, p))

	const q = { x: 2 }
	q.self = q
	t.ok(!matches(a, q))

	const r = { x: 1 }
	r.self = { x: 1, self: r }
	t.ok(matches(a, r))
})

test("object.matches non-enumerable props", (t) => {
	const obj = Object.defineProperty({}, 'x', { value: 1, enumerable: false })
	t.equal(matches(obj, { x: 1 }), false)
})
