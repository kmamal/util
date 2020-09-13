const { test } = require('@xyz/tests')
const { intersection } = require('.')

test('set.intersection', (t) => {
	const a = new Set([ 1, 2, 3 ])
	const b = new Set([ 2, 3, 4 ])
	const set = intersection(a, b)

	t.assert(() => set.size <= a.size)

	// The intercetion contains only values that are both in a and b
	for (const x of set) {
		if (!a.has(x)) {
			t.fail({ reason: "value not removed", x, a })
		}

		if (!b.has(x)) {
			t.fail({ reason: "value not removed", x, b })
		}
	}

	// All values of a appear if they are also in b
	for (const x of a) {
		if (set.has(x)) {
			if (!b.has(x)) {
				t.fail({ reason: "value not removed", x, a })
			}
		} else if (b.has(x)) {
			t.fail({ reason: "value missing", x, a })
		}
	}

	// All values of b appear if they are also in a
	for (const x of b) {
		if (set.has(x)) {
			if (!a.has(x)) {
				t.fail({ reason: "value not removed", x, a })
			}
		} else if (a.has(x)) {
			t.fail({ reason: "value missing", x, a })
		}
	}
})
