const { test } = require('@kmamal/testing')
const { LinkedList } = require('./linked-list')
const { rand } = require('../random/rand')
const { choose } = require('../random/choose')

const listEqualsArray = (t, list, array) => {
	t.equal([ ...list.values() ], array, { list, array })
	t.equal(list.size(), array.length, { list, array })
	for (let i = 0; i < list.size(); i++) {
		t.equal(list.get(i), array[i], { i, list, array })
	}
}

test("structs.linked-list", (t) => {
	const a = new LinkedList()
	const b = []
	listEqualsArray(t, a, b)

	for (let i = 0; i < 100; i++) {
		const x = rand(100)
		a.unshift(x)
		b.unshift(x)
	}
	listEqualsArray(t, a, b)

	const ops = [
		() => {
			const x = a.shift()
			const y = b.shift()
			t.equal(x, y, { a, b })
		},
		() => {
			const x = rand(100)
			a.unshift(x)
			b.unshift(x)
		},
		() => {
			const size = a.size()
			if (size === 0) { return }
			const i = rand(size)
			const x = rand(100)
			a.set(i, x)
			b[i] = x
		},
		() => {
			const i = rand(a.size())
			const x = rand(100)
			a.insertAt(i, x)
			b.splice(i, 0, x)
		},
		() => {
			const i = rand(a.size())
			const x = a.removeAt(i)
			const [ y ] = b.splice(i, 1)
			t.equal(x, y, { a, b })
		},
	]

	for (let i = 0; i < 10000; i++) {
		choose(ops)()
		listEqualsArray(t, a, b)
	}

	while (a.size() > 0) {
		a.shift()
		b.shift()
		listEqualsArray(t, a, b)
	}
})
