const { test } = require('@kmamal/testing')
const { addDefault } = require('./add-default')

test("map.addDefault Counting", (t) => {
	const a = [ 1, 2, 1, 3 ]
	const counts = new Map()
	addDefault(counts, () => 0)

	for (const x of a) {
		counts.set(x, counts.get(x) + 1)
	}

	t.equal(counts.get(1), 2)
	t.equal(counts.get(2), 1)
	t.equal(counts.get(3), 1)
	t.equal(counts.get(4), 0)
})

test("map.addDefault Argument", (t) => {
	const map = new Map()
	addDefault(map, (x) => x)

	t.equal(map.get(1), 1)
	t.equal(map.get(2), 2)
	t.equal(map.get(3), 3)
	t.equal(map.get(null), null)

	const a = { foo: 42 }
	t.equal(map.get(a), a)
})
