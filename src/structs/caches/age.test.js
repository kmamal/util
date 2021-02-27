const { test } = require('@xyz/testing')
const { Age } = require('./age')
const { sleep } = require('../../promise/sleep')

const compareMaps = (t, actual, expected) => {
	t.equal(actual.size, expected.size)
	for (const key of expected.keys()) {
		t.equal(actual.has(key), expected.has(key))
		t.equal(actual.get(key), expected.get(key))
	}
}

test("structs.caches.age sync", (t) => {
	const a = new Age(100)
	const b = new Map()
	compareMaps(t, a, b)

	a.set(1, 'a')
	b.set(1, 'a')
	compareMaps(t, a, b)

	a.set(2, 'b')
	b.set(2, 'b')
	compareMaps(t, a, b)

	a.set(3, 'c')
	b.set(3, 'c')
	compareMaps(t, a, b)

	a.delete(2)
	b.delete(2)
	compareMaps(t, a, b)
})

test("structs.caches.age expiration", async (t) => {
	t.timeout(1e3)

	const a = new Age(150)
	a.set(1, 'a')

	await sleep(100)
	t.equal(a.has(1), true)
	a.set(2, 'b')

	await sleep(100)
	t.equal(a.has(1), false)
	t.equal(a.get(2), 'b')

	await sleep(100)
	t.equal(a.get(1), undefined)
	t.equal(a.get(2), 'b')

	await sleep(100)
	t.equal(a.has(2), true)

	await sleep(100)
	t.equal(a.has(2), false)
})
