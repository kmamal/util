const { test } = require('../test')
const { difference } = require('./difference')

test('set.difference', (t) => {
	const a = new Set([ 1, 2, 3 ])
	const b = new Set([ 2, 3, 4 ])
	const diff = difference(a, b)

	t.assert(() => diff.size <= a.size)

	for (const x of diff) {
		if (!a.has(x)) {
			t.fail('value missing', { x, a })
		}
	}

	for (const x of diff) {
		if (b.has(x)) {
			t.fail('value not removed', { x, b })
		}
	}
})
