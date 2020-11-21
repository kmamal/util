const { test } = require('@xyz/testing')
const { Lru } = require('./lru')

const compareMaps = (t, actual, expected) => {
	t.equal(actual.size, expected.size)
	for (const key of expected) {
		t.equal(actual.has(key), expected.has(key))
		t.equal(actual.get(key), expected.get(key))
	}
}

test('structs.caches.lru', (t) => {
	const a = new Lru(3)
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

	a.get(1)
	a.get(3)
	a.set(4, 'd')
	b.set(4, 'd')
	b.delete(2)
	compareMaps(t, a, b)

	a.get(1)
	a.get(4)
	a.set(5, 'e')
	b.set(5, 'e')
	b.delete(3)
	compareMaps(t, a, b)
})
