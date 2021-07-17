const { test } = require('@kmamal/testing')
const { matches, matchesWith } = require('./matches')

test('object.matches', (t) => {
	t.ok(matches({}, {}))
	t.ok(matches({ a: 1, b: 2 }, {}))
	t.ok(matches({ a: 1, b: 2 }, { a: 1 }))
	t.ok(matches({ a: 1, b: 2 }, { b: 2 }))
	t.ok(matches({ a: 1, b: 2 }, { a: 1, b: 2 }))
	t.ok(matches({ a: 1, b: 2 }, { c: undefined }))
	t.ok(!matches({ a: 1, b: 2 }, { a: 2 }))
	t.ok(!matches({ a: 1, b: 2 }, { b: 1 }))
	t.ok(!matches({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 }))
})

test('object.matchesWith', (t) => {
	t.ok(matchesWith(
		{ a: 1, b: 2, c: 3 },
		{ a: 1, b: 2, c: 4 },
		(a, b, key) => key === 'c' ? true : a === b,
	))
	t.ok(!matchesWith(
		{ a: 1, b: 2, c: 3 },
		{ a: 2, b: 2, c: 4 },
		(a, b, key) => key === 'c' ? true : a === b,
	))
})
